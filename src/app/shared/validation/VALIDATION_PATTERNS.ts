export const VALIDATION_PATTERNS = {
    phone: new RegExp('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$'),
    zip: new RegExp('[0-9]{5}'),
}
