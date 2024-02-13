
///Sirve para NO MOSTRAR elementos que solo son accesibles para el admin
function IsAdminOnlyVisible({children})
{
    var isAdmin = true;
    if(isAdmin===false)
        return null;


    return(
        {children}
    )
}

export default IsAdminOnlyVisible;