import React, {useState} from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
    onColorChange: (color: string) => void;
    onToggleSidebar: () => void;
    onFontIncrease: () => void;
    onFontDecrease: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
                                             onColorChange,
                                             onToggleSidebar,
                                             onFontIncrease,
                                             onFontDecrease
                                         }) => {
    const [activeChannel, setActiveChannel] = useState('1');
    const [activeColor, setActiveColor] = useState('color-green');

    const handleChannelClick = (channel: string) => {
        setActiveChannel(channel);
    };

    const handleColorClick = (color: string, hex: string) => {
        setActiveColor(color);
        onColorChange(hex);
    };

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebar}>
                <div className={styles.systemInfo}>
                    <div className={styles.systemBox}>
                        <div className={styles.systemTitle}>PORTFOLIO-TUI</div>
                        <div className={styles.systemVersion}>v0.1</div>
                    </div>
                    <div className={styles.systemBox}>
                        <div className={styles.systemTitle}>CH-01</div>
                        <div className={styles.systemVersion}>LIVE</div>
                    </div>
                </div>

                <div className={styles.channelSection}>
                    <div className={styles.sectionTitle}>Channel Select</div>
                    <div className={styles.channelGrid}>
                        <button
                            className={`${styles.channelBtn} ${activeChannel === '1' ? styles.active : ''}`}
                            onClick={() => handleChannelClick('1')}
                        >
                            <span className={styles.channelNumber}>1</span>
                            <span className={styles.channelLabel}>HOME</span>
                        </button>
                        <button
                            className={`${styles.channelBtn} ${activeChannel === '2' ? styles.active : ''}`}
                            onClick={() => handleChannelClick('2')}
                        >
                            <span className={styles.channelNumber}>2</span>
                            <span className={styles.channelLabel}>ABOUT</span>
                        </button>
                        <button
                            className={`${styles.channelBtn} ${activeChannel === '3' ? styles.active : ''}`}
                            onClick={() => handleChannelClick('3')}
                        >
                            <span className={styles.channelNumber}>3</span>
                            <span className={styles.channelLabel}>PROJECTS</span>
                        </button>
                        <button
                            className={`${styles.channelBtn} ${activeChannel === '4' ? styles.active : ''}`}
                            onClick={() => handleChannelClick('4')}
                        >
                            <span className={styles.channelNumber}>4</span>
                            <span className={styles.channelLabel}>TEAM</span>
                        </button>
                        <button
                            className={styles.contactBtn}
                            onClick={() => handleChannelClick('5')}
                        >
                            <span className={styles.channelNumber}>5</span>
                            <span style={{ marginLeft: '0.5rem' }}>CONTACT</span>
                        </button>
                    </div>
                </div>

                <div className={styles.bottomControls}>
                    <div className={styles.colorAdjust}>
                        <div className={styles.sectionTitle}>Color Adjust</div>
                        <div className={styles.colorGrid}>
                            <button
                                className={`${styles.colorBtn} ${styles.colorYellow} ${activeColor === 'color-yellow' ? styles.active : ''}`}
                                onClick={() => handleColorClick('color-yellow', '#ffd700')}
                            ></button>
                            <button
                                className={`${styles.colorBtn} ${styles.colorRed} ${activeColor === 'color-red' ? styles.active : ''}`}
                                onClick={() => handleColorClick('color-red', '#ff1464')}
                            ></button>
                            <button
                                className={`${styles.colorBtn} ${styles.colorGreen} ${activeColor === 'color-green' ? styles.active : ''}`}
                                onClick={() => handleColorClick('color-green', '#00ff88')}
                            ></button>
                            <button
                                className={`${styles.colorBtn} ${styles.colorBlue} ${activeColor === 'color-blue' ? styles.active : ''}`}
                                onClick={() => handleColorClick('color-blue', '#00bfff')}
                            ></button>
                            <button
                                className={`${styles.colorBtn} ${styles.colorPurple} ${activeColor === 'color-purple' ? styles.active : ''}`}
                                onClick={() => handleColorClick('color-purple', '#8a2be2')}
                            ></button>
                        </div>
                    </div>

                    <div className={styles.systemControls}>
                        <div className={styles.sectionTitle}>System</div>
                        <div className={styles.volumeControls}>
                            <button
                                className={styles.volumeBtn}
                                onClick={onFontDecrease}
                            >
                                ZOOM -
                            </button>
                            <button
                                className={styles.volumeBtn}
                                onClick={onFontIncrease}
                            >
                                ZOOM +
                            </button>
                        </div>
                        <button
                            className={styles.powerBtn}
                            onClick={onToggleSidebar}
                        >
                            <div className={styles.powerIndicator}></div>
                            <span>POWER</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;