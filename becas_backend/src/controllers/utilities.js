


exports.subir_archivo = async function (req, res) {
    try {
        console.log(req.file.path)
        res.status(200).json(req.file);
    } catch (error) {
        console.log(error)
        res.status(200).json(error);
    }
}

exports.obtener_archivo = async function (req, res) {
    try {
        console.log(req.body)
        res.status(200).json(req.body);
    } catch (error) {
        console.log(error)
        res.status(200).json(error);
    }
}