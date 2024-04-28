function formatDate(fetched_date) {
    var input = fetched_date;

    if (input) {
        var date = new Date(input);
        var options = { month: 'long', day: 'numeric',  year: 'numeric' };
        var formattedDate = date.toLocaleDateString('en-US', options);
    }
    return formattedDate;
}

export default formatDate;