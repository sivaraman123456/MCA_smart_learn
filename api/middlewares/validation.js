
export const validation = (req, res, next) => {
    const { name, email, password } = req.body;
    console.log(req.body)

    function validEmail(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    if (req.path === "/register") {
        console.log({name,email, password})
        if (![name, email, password].every(Boolean)) {
            return res.json("Missing credential");
        } else if (!validEmail(email)) {
             return res.json("Invalid email");
        }
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
           return  res.json("Missing credential");
        } else if (!validEmail(email)) {
            return res.json("Invalid email");
        }
    }
    next();
};
