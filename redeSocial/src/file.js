import * as FileSystem from 'expo-file-system';

const path = FileSystem.documentDirectory + 'db.json';

export const Write = async (updatedData) => {
    try {
        const jsonString = JSON.stringify(updatedData);
        await FileSystem.writeAsStringAsync(path, jsonString);
    } catch (error) {
        console.error('Erro ao atualizar o arquivo JSON:', error);
    }
};

export const Read = async () => {
    try {
        const fileContents = await FileSystem.readAsStringAsync(path);
        return JSON.parse(fileContents);
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error);
    }
}

export const Create = async () => {
    const jsonStr = {
        "users": [
            {
                "id": 1,
                "nome": "Bruno",
                "email": "bruno@bruno.br",
                "senha": "b123",
                "sexo": "m"
            },
            {
                "id": 2,
                "nome": "Lorrayne",
                "email": "looh@looh.br",
                "senha": "l123",
                "sexo": "f"
            }
        ],
        "posts": [
            {
                "id": 1,
                "userId": 1,
                "texto": "Cachorro preto",
                "imagemURL": "https://picsum.photos/id/237/300/300",
                "curtidas": 3,
                "comentarios": [
                    {
                        "id": 1,
                        "userId": 2,
                        "texto": "Lindo"
                    },
                    {
                        "id": 2,
                        "userId": 1,
                        "texto": "Top hein, amei ❤️"
                    }
                ]
            }
        ]
    }
    Write(jsonStr)
}

export const Existe = async () => {
    const fileInfo = await FileSystem.getInfoAsync(path);
    return fileInfo.exists;
}
