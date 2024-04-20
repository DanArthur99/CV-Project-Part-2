const sendMail = (contactForm) => {
    emailjs.init({
        publicKey: "QXPidc8Us6Wyytpt0",
    }),
    emailjs.send("service_36zgv7a","template_k0fk59j", {
        from_name: contactForm.fullname.value,
        project_request: contactForm.projectsummary.value,
        from_email: contactForm.emailaddress.value
        })
        .then(response => {
            console.log("SUCCESS", response);
        }, error => {
            console.log("FAILED", error);
        })
    return false;
};