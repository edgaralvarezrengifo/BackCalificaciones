const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:4200/pais']
}));


const Alumno = [
    {ID:1, NOMBRE:'Santiago', APELLIDO:'Jaramillo'}
];

const Docente = [
    {ID:1, NOMBRE:'Alexander', APELLIDO:'Chaparro',DOCENTE_ID:1}
];

const Materia = [
    {ID:1, Nombre:'Arquitectura Cloud', DOCENTE_id:1}
];

const Calificacion = [
    {ID:1, NombreNota:'Nota 0', Valor:0,ID_Alumno:1, ID_Materia:1}
];

app.get('/',(req,res) => 
{
    res.send('Node JS api')
});

app.get('/api/students',(req,res)=>
{
    res.send(Alumno);
});

app.get('/api/students/:id',(req,res)=>
{
    const student = Alumno.find(x=> x.id == parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante no existente');
    else res.send(student);
});

app.post('/api/students/',(req,res)=>
{
    const student = 
    {
        id: Alumno.length + 1,
        name: 'Camilo',
        age: 32,
        enroll: true
    };
    Calificacion.push(student);
});


app.delete('/api/students/:id',(req,res)=>
{
    const student = students.find(x=> x.id == parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante no existente');

    const index = Alumno.indexOf(student);
    Calificacion.splice(index, 1);
    res.send(student);
});

app.post('/api/calificaciones/',(req,res)=>
{
    const idEstudiante = Alumno.find(x=> x.NOMBRE == req.body.nombreEstudiante).ID;
    if (idEstudiante == null)
    {
        res.send('Error: Alumno no existe')
    }

    const idMateria = Materia.find(x=> x.Nombre == req.body.nombreMateria).ID;
    if (idMateria == null)
    {
        res.send('Error: Materia no existe')
    }

    if (idMateria != null && idEstudiante != null)
    {
        const nombreNota = req.body.nombreNota;
        const valorNota = req.body.valorNota;
        const calificacion = {ID:Calificacion.length+1, NombreNota:nombreNota, Valor:valorNota, ID_Alumno: idEstudiante, ID_Materia:idMateria};
        Calificacion.push(calificacion);
        res.send(Calificacion);
    }
});

app.get('/api/calificaciones',(req,res)=>
{
    res.send(Calificacion);
});

const port = 8000;
app.listen(port,() => console.log(`Escuchando en el puerto ${port}`));