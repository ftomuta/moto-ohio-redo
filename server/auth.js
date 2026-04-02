import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-prod';

export function signToken(user) {
    return jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
}

export function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) reject(err);
            else resolve(user);
        });
    });
}

export async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

export async function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}
