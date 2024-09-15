export const commonErrorHandler = async (err) => {
    try {
        const json = await err.json()
        if (json.errorCode) {
            return new Error(`Error ${json.errorCode}: ${json.message || 'Unknown error'}`);
        } else {
            const errorMessage = `Failed to fetch`;
            return new Error(errorMessage);
        }
    } catch (error) {
        const errorMessage = `Failed to fetch`;
        return new Error(errorMessage);
    }
}

export const checkForErrorType = (error) => {
    if (error instanceof TypeError) {
        console.error('TypeError occurred (likely network or CORS issue):', error.message);
        return true;
    } else if (error instanceof SyntaxError) {
        console.error('SyntaxError (problem parsing response):', error.message);
        return false;
    } else if (error?.message?.includes('ERR_INVALID_TOKEN')) {
        console.error('Custom HTTP error:', error.message);
        return true;
    } else {
        console.error('Unexpected error:', error);
        return false;
    }
};