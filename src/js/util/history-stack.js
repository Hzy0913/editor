class HistoryStack {
    history = [];
    undoHistory = [];

    push(command) {
        this.history.push(command);
    }

    pop(command) {
        const undoCommadn = this.history.pop(command);
        this.undoHistory.push(undoCommadn);
    }

    clearUndoHistory() {
        this.undoHistory = [];
    }

}

export default new HistoryStack();
