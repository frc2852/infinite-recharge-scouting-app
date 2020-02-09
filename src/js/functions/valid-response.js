module.exports = (response) => {
    if (!response || !('status' in response) || response.status < 200 || response.status > 300) {
        return false;
    }

    return true;
}