export const profileImages = [
    {
        id: 1,
        src: "/christian.jpeg"
    },
    {
        id: 2,
        src: "/kent.jpeg"
    },
    {
        id: 3,
        src: "/prosper.jpg"
    },
    {
        id: 4,
        src: "/ryan.jpeg"
    },
    {
        id: 5,
        src: "/segun.jpg"
    },
    {
        id: 6,
        src: "/kent.jpeg"
    },
    {
        id: 7,
        src: "/christian.jpeg"
    },
    {
        id: 8,
        src: "/segun.jpg"
    },
    {
        id: 9,
        src: "/ryan.jpeg"
    },
    {
        id: 10,
        src: "/prosper.jpg"
    },
]

export const findProfileImageById = (id: number) => {
    const image = profileImages.find((img) => img.id === id);
    return image ? image.src : '/prosper.jpg';
};