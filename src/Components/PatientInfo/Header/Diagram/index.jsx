import { useFishbone } from '../../../../context/FishboneContext';
import { useVital } from '../../../../context/VitalContext';
import styles from './Diagram.module.scss';

const Diagram = ({ CBC_fishbone, BMP_fishbone, vitals }) => {
  const { wbc, hgb, hct, plts } = CBC_fishbone;
  const { na, k, cl, hco3, bun, creatinine, glucose } = BMP_fishbone;
  const { t, p, bp, rr, pox } = vitals;

  const { state } = useFishbone();
  const { vitalState } = useVital();

  return (
    <section className={styles._view}>
      {vitalState.show && (
        <div className={styles._patients_data}>
          <Level level='T' value={t + '°F'} />
          <Bar />
          <Level level='P' value={p} />
          <Bar />
          <Level level='BP' value={bp} />
          <Bar />
          <Level level='RR' value={rr} />
          <Bar />
          <Level level='Pox' value={pox} />
        </div>
      )}
      {state.show && (
        <div className={styles.fishbone_wrapper}>
          <div className={styles.CBC_fishbone}>
            <div className={styles.CBC_fishbone_item}>{wbc}</div>
            <div>
              <div className={styles.CBC_fishbone_item}>{hgb}</div>
              <div className={styles.CBC_fishbone_item}>{hct}</div>
            </div>
            <div className={styles.CBC_fishbone_item}>{plts}</div>
          </div>
          <div className={styles.BMP_fishbone}>
            <div
              style={{
                width: '28%',
              }}
              className={styles.BMP_fishbone_item_container}>
              <div className={styles.BMP_fishbone_item}>{na}</div>
              <div className={styles.BMP_fishbone_item}>{k}</div>
            </div>
            <div
              style={{
                width: '28%',
              }}
              className={styles.BMP_fishbone_item_container}>
              <div className={styles.BMP_fishbone_item}>{cl}</div>
              <div className={styles.BMP_fishbone_item}>{hco3}</div>
            </div>
            <div
              style={{
                width: '24%',
              }}
              className={styles.BMP_fishbone_item_container}>
              <div className={styles.BMP_fishbone_item}>{bun}</div>
              <div className={styles.BMP_fishbone_item}>{creatinine}</div>
            </div>
            <div
              style={{
                width: '20%',
                textAlign: 'right',
                paddingLeft: '18px',
                marginLeft: '5px',
              }}
              className={styles.BMP_fishbone_item_container}>
              <div className={styles.BMP_fishbone_item}>{glucose}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Diagram;

const Level = ({ level, value }) => {
  return (
    <div className={styles._level}>
      <div className={styles._level__title}>{level}</div>
      <div className={styles._level__value}>{value}</div>
    </div>
  );
};

const Bar = () => {
  return <div className={styles._bar} />;
};
