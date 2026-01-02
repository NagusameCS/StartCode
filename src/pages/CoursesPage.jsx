// Courses Page - Browse and select courses
import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiClock, FiBook, FiLock, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { useProgressStore } from '../store/progressStore';
import { getAllCourses, getCourse, getLessons, COURSE_CATEGORIES } from '../data/courses';
import styles from './CoursesPage.module.css';

const CoursesPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { completedLessons, isLessonCompleted, getCourseProgress } = useProgressStore();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const courses = getAllCourses();
    const selectedCourse = courseId ? getCourse(courseId) : null;
    const lessons = selectedCourse ? getLessons(courseId) : [];

    // Group courses by category
    const categories = [
        { id: 'all', name: 'All Courses' },
        { id: COURSE_CATEGORIES.FUNDAMENTALS, name: '🧠 Fundamentals' },
        { id: COURSE_CATEGORIES.LANGUAGE, name: '💻 Languages' },
        { id: COURSE_CATEGORIES.SYSTEMS, name: '⚙️ Systems' },
        { id: COURSE_CATEGORIES.WEB, name: '🌐 Web' },
        { id: COURSE_CATEGORIES.DATA, name: '📊 Data' },
        { id: COURSE_CATEGORIES.SCRIPTING, name: '📜 Scripting' },
        { id: COURSE_CATEGORIES.TOOLS, name: '🛠️ Tools' },
        { id: COURSE_CATEGORIES.EXTENSIONS, name: '🔌 Extensions' },
        { id: COURSE_CATEGORIES.FULLSTACK, name: '🚀 Full-Stack' },
    ];

    const filteredCourses = selectedCategory === 'all'
        ? courses
        : courses.filter(c => c.category === selectedCategory);

    // Check if prerequisites are met
    const arePrerequisitesMet = (course) => {
        if (!course.prerequisites || course.prerequisites.length === 0) return true;
        return course.prerequisites.every(prereq => {
            const prereqCourse = getCourse(prereq);
            if (!prereqCourse) return true;
            const prereqLessons = getLessons(prereq);
            return prereqLessons.every(l => completedLessons.includes(l.id));
        });
    };

    // Course detail view
    if (selectedCourse) {
        const progress = getCourseProgress(courseId, lessons.map(l => l.id));
        const prerequisitesMet = arePrerequisitesMet(selectedCourse);

        return (
            <div className={styles.courseDetail}>
                <motion.button
                    className={styles.backButton}
                    onClick={() => navigate('/courses')}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <FiArrowLeft /> Back to Courses
                </motion.button>

                <motion.div
                    className={styles.courseHeader}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div
                        className={styles.courseIconLarge}
                        style={{ backgroundColor: selectedCourse.color }}
                    >
                        <span>{selectedCourse.icon}</span>
                    </div>
                    <div className={styles.courseHeaderInfo}>
                        <h1>{selectedCourse.name}</h1>
                        <p>{selectedCourse.description}</p>
                        <div className={styles.courseMeta}>
                            <span><FiBook /> {lessons.length} lessons</span>
                            <span><FiClock /> ~{selectedCourse.estimatedHours} hours</span>
                            <span className={styles.progressBadge}>{progress}% complete</span>
                        </div>
                    </div>
                </motion.div>

                {/* Prerequisites warning */}
                {!prerequisitesMet && (
                    <motion.div
                        className={styles.prerequisiteWarning}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <FiLock />
                        <div>
                            <strong>Prerequisites Required</strong>
                            <p>Complete these courses first: {selectedCourse.prerequisites.map(p => getCourse(p)?.name).join(', ')}</p>
                        </div>
                    </motion.div>
                )}

                {/* Progress bar */}
                <motion.div
                    className={styles.progressSection}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className={styles.progressBar}>
                        <motion.div
                            className={styles.progressFill}
                            style={{ backgroundColor: selectedCourse.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        />
                    </div>
                </motion.div>

                {/* Lessons list */}
                <motion.div
                    className={styles.lessonsList}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2>Lessons</h2>
                    {lessons.map((lesson, index) => {
                        const completed = isLessonCompleted(lesson.id);
                        const locked = !prerequisitesMet || (index > 0 && !isLessonCompleted(lessons[index - 1].id) && !completed);

                        return (
                            <motion.div
                                key={lesson.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <Link
                                    to={locked ? '#' : `/lesson/${courseId}/${lesson.id}`}
                                    className={`${styles.lessonCard} ${completed ? styles.completed : ''} ${locked ? styles.locked : ''}`}
                                    onClick={e => locked && e.preventDefault()}
                                >
                                    <div className={styles.lessonNumber}>
                                        {completed ? <FiCheck /> : locked ? <FiLock /> : index + 1}
                                    </div>
                                    <div className={styles.lessonInfo}>
                                        <h3>{lesson.title}</h3>
                                        <p>{lesson.description}</p>
                                    </div>
                                    {!locked && <FiArrowRight className={styles.lessonArrow} />}
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        );
    }

    // Courses list view
    return (
        <div className={styles.courses}>
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Courses</h1>
                <p>Learn programming from natural language to real code</p>
            </motion.div>

            {/* Category filters */}
            <motion.div
                className={styles.categories}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
                        onClick={() => setSelectedCategory(cat.id)}
                    >
                        {cat.name}
                    </button>
                ))}
            </motion.div>

            {/* Courses grid */}
            <motion.div className={styles.grid} layout>
                <AnimatePresence mode="popLayout">
                    {filteredCourses.map((course, index) => {
                        const lessonIds = course.lessons?.map(l => l.id) || [];
                        const progress = getCourseProgress(course.id, lessonIds);
                        const prerequisitesMet = arePrerequisitesMet(course);

                        return (
                            <motion.div
                                key={course.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                                className={styles.courseWrapper}
                            >
                                <Link
                                    to={`/course/${course.id}`}
                                    className={`${styles.courseCard} ${!prerequisitesMet ? styles.locked : ''}`}
                                >
                                    <div
                                        className={styles.courseIcon}
                                        style={{ backgroundColor: course.color }}
                                    >
                                        <span>{course.icon}</span>
                                        {!prerequisitesMet && (
                                            <div className={styles.lockOverlay}>
                                                <FiLock />
                                            </div>
                                        )}
                                    </div>

                                    <h3>{course.name}</h3>
                                    <p>{course.description}</p>

                                    {/* Tags */}
                                    <div className={styles.tags}>
                                        <span className={styles.categoryTag}>{course.category}</span>
                                        {course.language && <span className={styles.langTag}>{course.language}</span>}
                                    </div>

                                    <div className={styles.cardMeta}>
                                        <span><FiBook /> {course.lessons?.length || 0} lessons</span>
                                        <span><FiClock /> ~{course.estimatedHours}h</span>
                                    </div>

                                    {progress > 0 && (
                                        <div className={styles.cardProgress}>
                                            <div className={styles.cardProgressBar}>
                                                <div
                                                    className={styles.cardProgressFill}
                                                    style={{ width: `${progress}%`, backgroundColor: course.color }}
                                                />
                                            </div>
                                            <span>{progress}%</span>
                                        </div>
                                    )}

                                    <div className={styles.cardFooter}>
                                        {progress === 100 ? (
                                            <span className={styles.completedBadge}><FiCheck /> Completed</span>
                                        ) : progress > 0 ? (
                                            <span className={styles.continueBadge}>Continue <FiArrowRight /></span>
                                        ) : !prerequisitesMet ? (
                                            <span className={styles.lockedBadge}><FiLock /> {course.prerequisites?.map(p => getCourse(p)?.name).join(', ')} required</span>
                                        ) : (
                                            <span className={styles.startBadge}>Start Learning <FiArrowRight /></span>
                                        )}
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default CoursesPage;
