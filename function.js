function getfirstname(fullname)
{
 fullname= fullname.split(" ") ;
 return fullname[0] ;   
}

function getlastname(fullname)
{
    fullname= fullname.split(" ") ;
    return fullname[1] ;
}

function fun(fullname,fn)
{
    let name=fn(fullname) ;
    console.log(name) ;
    return 20;
}

fun("steve roger",getfirstname)
fun("tony stark", getlastname)