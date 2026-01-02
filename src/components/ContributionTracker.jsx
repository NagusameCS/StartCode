// Contribution Tracker Component - GitHub-style activity grid
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useProgressStore } from '../store/progressStore';
import styles from './ContributionTracker.module.css';

const ContributionTracker = ({ activityLog: externalLog }) => {
    const { activityLog: storeLog } = useProgressStore();
    const activityLog = externalLog || storeLog;

    // Generate last 365 days
    const days = useMemo(() => {
        const result = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 364; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            result.push({
                date: dateStr,
                count: activityLog[dateStr] || 0,
                dayOfWeek: date.getDay()
            });
        }
        return result;
    }, [activityLog]);

    // Group by weeks
    const weeks = useMemo(() => {
        const result = [];
        let currentWeek = [];

        days.forEach((day, index) => {
            if (index === 0) {
                // Add empty slots for days before the first day
                for (let i = 0; i < day.dayOfWeek; i++) {
                    currentWeek.push(null);
                }
            }

            currentWeek.push(day);

            if (day.dayOfWeek === 6 || index === days.length - 1) {
                result.push(currentWeek);
                currentWeek = [];
            }
        });

        return result;
    }, [days]);

    // Get intensity level (0-4)
    const getLevel = (count) => {
        if (count === 0) return 0;
        if (count <= 2) return 1;
        if (count <= 5) return 2;
        if (count <= 10) return 3;
        return 4;
    };

    // Get month labels
    const months = useMemo(() => {
        const result = [];
        let lastMonth = -1;

        weeks.forEach((week, weekIndex) => {
            const firstDay = week.find(d => d !== null);
            if (firstDay) {
                const month = new Date(firstDay.date).getMonth();
                if (month !== lastMonth) {
                    result.push({ month, weekIndex });
                    lastMonth = month;
                }
            }
        });

        return result;
    }, [weeks]);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Calculate total contributions
    const totalContributions = Object.values(activityLog).reduce((sum, count) => sum + count, 0);

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className={styles.header}>
                <span className={styles.total}>
                    {totalContributions} lessons completed in the last year
                </span>
            </div>

            <div className={styles.tracker}>
                {/* Day labels */}
                <div className={styles.dayLabels}>
                    {dayNames.map((day, i) => (
                        <span key={day} className={styles.dayLabel} style={{ gridRow: i + 1 }}>
                            {i % 2 === 1 ? day : ''}
                        </span>
                    ))}
                </div>

                {/* Grid */}
                <div className={styles.grid}>
                    {/* Month labels */}
                    <div className={styles.monthLabels}>
                        {months.map(({ month, weekIndex }) => (
                            <span
                                key={`${month}-${weekIndex}`}
                                className={styles.monthLabel}
                                style={{ gridColumn: weekIndex + 1 }}
                            >
                                {monthNames[month]}
                            </span>
                        ))}
                    </div>

                    {/* Contribution squares */}
                    <div className={styles.squares}>
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className={styles.week}>
                                {week.map((day, dayIndex) => (
                                    day ? (
                                        <div
                                            key={day.date}
                                            className={`${styles.square} ${styles[`level${getLevel(day.count)}`]}`}
                                            title={`${day.date}: ${day.count} lesson${day.count !== 1 ? 's' : ''}`}
                                        />
                                    ) : (
                                        <div key={dayIndex} className={styles.empty} />
                                    )
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className={styles.legend}>
                <span>Less</span>
                <div className={`${styles.square} ${styles.level0}`} />
                <div className={`${styles.square} ${styles.level1}`} />
                <div className={`${styles.square} ${styles.level2}`} />
                <div className={`${styles.square} ${styles.level3}`} />
                <div className={`${styles.square} ${styles.level4}`} />
                <span>More</span>
            </div>
        </motion.div>
    );
};

export default ContributionTracker;
