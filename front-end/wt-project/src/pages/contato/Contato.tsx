import React, { useRef } from "react";
import { useForm, SubmitHandler, ChangeHandler } from "react-hook-form";
import './Contato.css';
import { Grid, Box, Typography, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";

type Inputs = {
    nome: string,
    email: string,
    mensagem: string

};

function Contato() {
    function sendEmail(e: any): void {

        e.preventDefault();
        emailjs.sendForm('GmailMessageWT', 'WomensTemplate', e.target, 'user_PaWt6qBcoiQoSKWf7JxZA').then((result) => { alert("Mensagem enviada com sucesso."); }, (error) => { alert(error.message) });
        e.target.reset();
    }

    const onSubmit: SubmitHandler<Inputs> = data => {

        console.log(data);

    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={6} className="bgImageContato"></Grid>
                <Grid item xs={6} alignItems="center">
                    <Box paddingX={10}>
                        <form onSubmit={sendEmail} id="form_contato">
                            <Typography variant="h4" gutterBottom color="textPrimary" component="h3" align="center">Contato</Typography>
                            <TextField id="nome" label="Nome" variant="outlined" margin="normal" fullWidth {...register("nome", { required: true, maxLength: 30, minLength: 3 })} />
                            {errors.nome?.type === 'required' && <span className="msgError"> "O Nome é um atributo obrigatório!"</span>}
                            {errors.nome && errors.nome.type === "maxLength" && <span className="msgError">O tamanho para o nome foi excedido! Use no máximo 30 caracteres.</span>}
                            {errors.nome && errors.nome.type === "minLength" && <span className="msgError">O tamanho para o nome está curto! Use mais de 3 caracteres.</span>}

                            <TextField id="nome" type="email" label="Email" variant="outlined" margin="normal" fullWidth {...register("email", { required: true, maxLength: 100, minLength: 10, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Endereço de email inválido!" } })} />
                            {errors.email?.type === 'required' && <span className="msgError">O email é um atributo obrigatório!</span>}
                            {errors.email && errors.email.type === "maxLength" && <span className="msgError">O tamanho para o email foi excedido! Use no máximo 100 caracteres.</span>}
                            {errors.email && errors.email.type === "minLength" && <span className="msgError">O tamanho para o email está curto! Use mais de 10 caracteres.</span>}

                            <TextField
                                id="outlined-multiline-flexible"
                                variant="outlined"
                                label="Mensagem"
                                placeholder="Escreva aqui sua mensagem"
                                multiline
                                fullWidth

                                margin="normal"
                                {...register("mensagem", { required: true, maxLength: 1500, minLength: 3 })}
                            />
                            {errors.mensagem?.type === 'required' && <span className="msgError">A mensagem é um atributo obrigatório!</span>}
                            {errors.mensagem && errors.mensagem.type === "maxLength" && <span className="msgError">O tamanho para a mensagem foi excedido! Use no máximo 1500 caracteres.</span>}
                            {errors.mensagem && errors.mensagem.type === "minLength" && <span className="msgError">O tamanho para a mensagem está curto! Use mais de 3 caracteres.</span>}

                            <Box marginTop={2} textAlign="center">
                                <Link to="/home" className="text-decorator-none">
                                    <Button variant="outlined" className="botao2">
                                        Cancelar
                                    </Button>
                                </Link>

                                <Button type="submit" variant="outlined" className="botao">
                                    Enviar
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Contato;
