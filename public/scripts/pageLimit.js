function calculatePageLimit(totalDocuments, documentsPerPage = 15) {
    if (totalDocuments <= 0) return 0; // No documents mean no pages.
    
    // Calculate the total number of pages needed
    const pages = Math.ceil(totalDocuments / documentsPerPage);
    return pages;
}

export {calculatePageLimit};