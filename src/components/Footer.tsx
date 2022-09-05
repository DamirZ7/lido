import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.links}>
            <h4>Время работы</h4>
            <p>Ежедневно</p>
            <p>12:00 - 24:00</p>
          </div>
          <div className={styles.links}>
            <h4>Контакты</h4>
            <a href='tel:+7‒747‒714‒70‒00'>+7‒747‒714‒70‒00</a>
            <a href='mailto:lido@gmail.com'>lido@gmail.com</a>
            <a href='https://2gis.kz/pavlodar/branches/70000001043641868/firm/70000001060637118/76.991657%2C52.264157?m=76.991658%2C52.264148%2F18'>
              Наш адрес
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
