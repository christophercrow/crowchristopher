import React from 'react';

const Footer = () => {
    const styles = {
        footer: {
            textAlign: 'center',
            padding: '16px',
            backgroundColor: '#333',
            color: '#fff',
            fontSize: '14px',
        },
        link: {
            color: '#4caf50',
            textDecoration: 'none',
        },
    };

    return (
        <footer style={styles.footer}>
            <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
            <p>
                Follow me on <a href="https://github.com/your-profile" style={styles.link}>GitHub</a>.
            </p>
        </footer>
    );
};

export default Footer;
