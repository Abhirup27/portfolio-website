
import styles from './MobileNavBar.module.css';

interface MobileNavBarProps {
    activeChannel: string;
    onChannelClick: (channel: string) => void;
    onColorChange: () => void;
    onToggleNav: () => void;
}

function MobileSidebar(props: MobileNavBarProps) {
    const { activeChannel, onChannelClick, onColorChange, onToggleNav } = props;
    return (
        <div className={styles.mobileNavBar}>
            {['1', '2', '3', '4', '5'].map(channel => (
                <button key={channel} className={`${styles.navButton} ${activeChannel === channel ? styles.active : ''}`} onClick={() => onChannelClick(channel)}>
                    {channel}
                </button>
            ))}

            <button className={styles.colorButton} onClick={onColorChange}>
                <div className={styles.colorDot}></div>
            </button>

            <button className={styles.toggleButton} onClick={onToggleNav}>
                •
            </button>
        </div>
    );
};

export default MobileSidebar;