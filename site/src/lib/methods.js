const getCurrentDate = () => {
    let today = new Date();
    let dayOfWeek = today.getDay();

    // Determine the number of days to subtract
    let daysToSubtract = 1; // Default for Tuesday to Saturday

    if (dayOfWeek === 0) { // Sunday
        daysToSubtract = 2; // Move to the previous Friday
    } else if (dayOfWeek === 1) { // Monday
        daysToSubtract = 3; // Move to the previous Friday
    }

    let targetDate = new Date(today);
    targetDate.setDate(today.getDate() - daysToSubtract);

    let dd = targetDate.getDate();
    let mm = targetDate.getMonth() + 1; // Months are zero-based
    let yyyy = targetDate.getFullYear();

    // Add leading zero if the day is less than 10
    if (dd < 10) {
        dd = '0' + dd;
    }

    // Add leading zero if the month is less than 10
    if (mm < 10) {
        mm = '0' + mm;
    }

    return `${yyyy}-${mm}-${dd}`;
};

export default getCurrentDate;