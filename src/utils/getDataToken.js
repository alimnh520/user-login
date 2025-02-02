import jwt from 'jsonwebtoken';

export const GetDataToken = (request) => {
    try {
        const token = request.cookies.get("get")?.value || '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        return decodedToken.id
    } catch (error) {
        console.log('Get token error is : ', error);
    }
}