export { default } from 'next-auth/middleware'



export const config = {
    matcher: ['/home_test', '/form_visitante', '/form_residente', '/form_guardia', '/form_nurse', '/residentes', '/visitantes', '/', 
    '/enfermeros', '/guardias', '/register', '/reserva', '/ficha_residente', '/tablaResEnfer', '/guardiareservas', '/reservasAprobadas', '/calendar_admin', '/bitacora_residente']
}

