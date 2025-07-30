interface User {
    _id: string,
    name: string,
    email: string,
    credits: number
}

interface Image {
    _id: string,
    url: string,
    prompt: string,
    isPublic: boolean,
    creator: {
        _id: string;
        name: string;
    };
    createdAt: string
}

interface Plan {
    id: string
    name: string,
    description: string,
    credits: number,
    price: number,
}

interface UserResponse {
    token: string;
    user: User;
}

interface GenerateImageResponse {
    generatedImage: Image;
    remainingCredits: number;
}
