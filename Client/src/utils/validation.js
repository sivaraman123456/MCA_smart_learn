const Validation = (inputs) => {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^s@]+$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const phone=/^\d{10}$/
    if (inputs.email === "" ) {
        error.email = "Email should not be empty"
    }
    else if (!email_pattern.test(inputs.email)) {
        error.email = "Email doesn't match"
    } else {
        error.email = ""
    }
  
if(inputs.name==="")
    {
        error.name="Name should not be empty"
    }
else{
    error.name=""
}
    if (inputs.password === "") {
        error.password = "Password should not be empty"
    }
    else if (!password_pattern.test(inputs.password)) {
        error.password = "Password doesn't match"
    } else {
        error.password = ""
    }

    return error;
}

export { Validation }