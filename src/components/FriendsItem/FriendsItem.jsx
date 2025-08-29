import css from './FriendsItem.module.css';

function FriendsItem({ friend }) {

  // Функція для отримання поточного дня тижня (0 = неділя, 1 = понеділок, ...)
  const getCurrentDayOfWeek = () => {
    return new Date().getDay();
  };

  // Функція для отримання назви дня тижня
  const getDayName = (dayIndex) => {
    const days = [
      'Неділя',
      'Понеділок',
      'Вівторок',
      'Середа',
      'Четвер',
      "П'ятниця",
      'Субота',
    ];
    return days[dayIndex];
  };

  // Функція для отримання інформації про робочий день
  const getWorkDayInfo = () => {
    if (!friend.workDays || !Array.isArray(friend.workDays)) {
      return null;
    }

    const currentDay = getCurrentDayOfWeek();
    const workDay = friend.workDays[currentDay];

    if (!workDay || !workDay.isOpen) {
      return null;
    }

    return {
      dayName: getDayName(currentDay),
      from: workDay.from,
      to: workDay.to,
    };
  };

  const workDayInfo = getWorkDayInfo();

  return (
    <div className={css.friendCard}>
      <div className={css.friendImageBox}>
        <img
          src={friend.imageUrl}
          alt={friend.title}
          className={css.friendImage}
        />
      </div>
      <div className={css.friendInfoBox}>
        <h3 className={css.title}>{friend.title}</h3>
        {friend.email && (
          <p className={css.friendInfo} title={friend.email}>
            <span className={css.friendInfoSpan}>Email: </span>
            {friend.email}
          </p>
        )}
        {friend.address && (
          <p className={css.friendInfo} title={friend.address}>
            <span className={css.friendInfoSpan}>Address: </span>
            {friend.address}
          </p>
        )}
        {friend.phone && (
          <p className={css.friendInfo} title={friend.phone}>
            <span className={css.friendInfoSpan}>Phone: </span>
            {friend.phone}
          </p>
        )}
      </div>
      {workDayInfo && (
        <p className={css.friendTime}>
          {workDayInfo.from} - {workDayInfo.to}
        </p>
      )}
    </div>
  );
}

export default FriendsItem;
