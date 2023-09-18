function permissions(req, res, next) {

    const verify_routes = [
        '/private',
    ];

    if (!verify_routes.includes(req.path)) {
        return next();
    }

    const permissions = req.tokenPayload.permissions;

    if (req.method === 'GET') {
        if (permissions.includes('read')) return next();
    }

    if (req.method === 'POST') {
        if (permissions.includes('write')) return next();
    }

    return res.status(401).json({
        message: `You do not have permissions to ${req.method === 'GET' ? 'read' : 'write'}`
    });
}

module.exports = permissions;