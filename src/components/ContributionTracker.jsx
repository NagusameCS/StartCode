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

    // Get month labels - position them at the start of each month
    const months = useMemo(() => {
        const result = [];
        let lastMonth = -1;
        let weekIndex = 0;

        weeks.forEach((week) => {
            // Find the first valid day in this week
            const firstValidDay = week.find(d => d !== null);
            if (firstValidDay) {
                const dayDate = new Date(firstValidDay.date);
                const month = dayDate.getMonth();
                const dayOfMonth = dayDate.getDate();

                // Only add month label at the start of a new month
                // Check if this week contains the 1st of a month (or is the first week showing that month)
                if (month !== lastMonth) {
                    // Only show if it's early in the month (first week of that month)
                    if (dayOfMonth <= 7) {
                        result.push({ month, weekIndex });
                        lastMonth = month;
                    }
                }
            }
            weekIndex++;
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
                {/* Grid */}
                <div className={styles.grid}>
                    {/* Month labels */}
                    <div className={styles.monthLabels}>
                        {months.map(({ month, weekIndex }) => (
                            <span
                                key={`${month}-${weekIndex}`}
                                className={styles.monthLabel}
                                style={{ left: `${weekIndex * 14}px` }}
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
