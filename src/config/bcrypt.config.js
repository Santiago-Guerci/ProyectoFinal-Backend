import bcrypt from 'bcrypt'

// FUNCIONES PARA ENCRIPTAR Y CHEQUEAR PASSWORD. DEBERÍAN IR EN LOS CONTROLADORES O EN LAS RUTAS ?
function encriptPw(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
  
  function verifyPw(realPw, encriptedPw) {
    return bcrypt.compareSync(realPw, encriptedPw);
  }
// FIN FUNCIONES DE ENCRIPTADO.

export { encriptPw, verifyPw }