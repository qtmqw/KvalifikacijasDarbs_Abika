import { loginR, registerR, userR, forgotP, gallU, deleteU } from '../utils/APIRoutes'
import { toast } from 'react-toastify';

export const Register = async ({ username, name, lastname, email, company, password, userType } = {}) => {
    const user = { username, name, lastname, email, company, password, userType }

    console.log(username, name, lastname, email, company, password, userType);
    const res = await fetch(`${registerR}`, {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userRegister");
            if (data.status === "OK") {
                toast.success("Reģistrācija veiksmīga");
                window.location.href = "/Pieslegties";

            } else {
                toast.error("Kaut kur ir kļūda");
            }
        });
}

export const Login = async ({ email, password } = {}) => {
    const user = { email, password };

    try {
        const res = await fetch(`${loginR}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await res.json();
        if (data.status === "OK") {
            toast.success("Autorizācija veiksmīga");
            localStorage.setItem("token", data.data);
            localStorage.setItem("loggedIn", true);
            window.location.href = "./userData";
        } else {
            toast(data.error);
        }
    } catch (error) {
        console.error(error);
        toast.error("Nepareizi ievadīti dati. Mēģiniet vēlreiz.");
    }
}

export const UserData = async ({ setAdmin, setUserData }) => {
    const response = await fetch(`${userR}`, {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            token: window.localStorage.getItem("token"),
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userData");
            if (data.data.userType === "Admin") {
                setAdmin(true);
            }

            setUserData(data.data);

            if (data.data === "token expired") {
                toast.error("Token expired login again");
                window.localStorage.clear();
                window.location.href = "./";
            }
        });
}

export const GetAllUser = async ({ setData }) => {
    fetch(`${gallU}`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userData");
            setData(data.data);
        });
};

export const DeleteUser = async ({ getAllUser, userid: id }) => {
    const del = { userid: id }

    fetch(`${deleteU}`, {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(del),
    })
        .then((res) => res.json())
        .then((data) => {
            toast(data.data);
            getAllUser();
        });
};

export const ForgotPassword = async ({ email }) => {
    const eail = { email }

    fetch(`${forgotP}`, {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(eail),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userRegister");
            toast(data.status)
        });
};

