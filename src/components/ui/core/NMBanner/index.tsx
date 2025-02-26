import styles from './NMBanner.module.css';

const NMBanner = ({ title, path }: { title: string; path: string }) => {
  return (
    <div
      className={`${styles.banner} border-2 border-white flex justify-center items-center rounded-xl my-6 p-5 lg:py-0 lg:px-12`}
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold leading-10">{title}</h2>
        <p className="text-sm text-gray-700">{path}</p>
      </div>
    </div>
  );
};

export default NMBanner;
