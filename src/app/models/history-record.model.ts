export class HistoryRecord 
{
    inputBook: String
    inputAuthor: String
    outputHistory: String

    constructor(inputBook: String, inputAuthor: String, outputHistory: String) 
    {
        this.inputBook = inputBook;
        this.inputAuthor = inputAuthor;
        this.outputHistory = outputHistory;
    }
}