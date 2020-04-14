function ( range ) {
    if ( range ) {
        this._lastSelection = range;
        // If we're setting selection, that automatically, and synchronously, // triggers a focus event. So just store the selection and mark it as
        // needing restore on focus.
        if ( !this._isFocused ) {
            enableRestoreSelection.call( this );
        } else if ( isAndroid && !this._restoreSelection ) {
            // Android closes the keyboard on removeAllRanges() and doesn't
            // open it again when addRange() is called, sigh.
            // Since Android doesn't trigger a focus event in setSelection(),
            // use a blur/focus dance to work around this by letting the
            // selection be restored on focus.
            // Need to check for !this._restoreSelection to avoid infinite loop
            enableRestoreSelection.call( this );
            this.blur();
            this.focus();
        } else {
            // iOS bug: if you don't focus the iframe before setting the
            // selection, you can end up in a state where you type but the input
            // doesn't get directed into the contenteditable area but is instead
            // lost in a black hole. Very strange.
            if ( isIOS ) {
                this._win.focus();
            }
            var sel = getWindowSelection( this );
            if ( sel ) {
                sel.removeAllRanges();
                sel.addRange( range );
            }
        }
    }
    return this;
};
