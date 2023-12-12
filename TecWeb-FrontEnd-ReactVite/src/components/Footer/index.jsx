import styles from './footer.module.css'

export function Footer() {
   return(
      <div className={styles.container}>
         <div className={styles.copyrighting}>
               <p>&copy; 2023 Uni-Eventos. Todos os direitos reservados.</p>
         </div>
         <div className={styles.contact}>
               <p>Contato: <a href="mailto:gabrielmeireles2001@hotmail.com.br">uni-eventos-atendimento@gmail.com</a></p>
         </div>
      </div>
   )
}