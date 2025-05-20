import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { a, useChain, useSpring, useSpringRef } from '@react-spring/web';

import DesktopNav from '../../../layout/DesktopNav';
import SocialIcons from '../../../ui/SocialIcons';
import Cursor from '../../../ui/Cursor';
import blogConfig from '../../../../data/blogConfig.json';


const BlogDetail = () => {
    const { id } = useParams();
    const blog = blogConfig.find((post) => post.id === parseInt(id));

    // Hooks must be defined unconditionally:
    const headerRef = useSpringRef();
    const headerAnim = useSpring({
        ref: headerRef,
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { opacity: 0, y: -50 },
        to: { opacity: 1, y: 0 },
    });

    const contentRef = useSpringRef();
    const contentAnim = useSpring({
        ref: contentRef,
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { opacity: 0, x: -50 },
        to: { opacity: 1, x: 0 },
    });

    const footerRef = useSpringRef();
    const footerAnim = useSpring({
        ref: footerRef,
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
    });

    useChain([headerRef, contentRef, footerRef], [0, 0.5, 1], 500);

    return (
        <PageWrapper>
            <DesktopNav />
            {!blog ? (
                <NotFoundMessage>Blog post not found.</NotFoundMessage>
            ) : (
                <ContentWrapper>
                    <a.div style={headerAnim}>
                        <Header>
                            <Title>{blog.title}</Title>
                            <Date>{blog.date}</Date>
                        </Header>
                    </a.div>
                    <a.div style={contentAnim}>
                        <Content>{blog.content}</Content>
                    </a.div>
                    <a.div style={footerAnim}>
                        <BackLink to="/blog">← Back to Blog</BackLink>
                    </a.div>
                </ContentWrapper>
            )}
            <FooterWrapper>
                <SocialIcons />
            </FooterWrapper>
            <Cursor />
        </PageWrapper>
    );
};

export default BlogDetail;

const PageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(25, 25, 25, 1));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
    color: white;
    text-align: center;
`;

const Header = styled.div`
    margin-bottom: 24px;
`;

const Title = styled.h1`
    font-size: 2.8rem;
    font-weight: 700;
    color: #f7ec09;
    margin-bottom: 8px;
`;

const Date = styled.p`
    font-size: 1rem;
    color: #aaa;
    margin-bottom: 16px;
`;

const Content = styled.div`
    font-size: 1.2rem;
    color: #ccc;
    line-height: 1.8;
    max-width: 800px;
    margin-bottom: 32px;
`;

const BackLink = styled(Link)`
    margin-top: 32px;
    font-size: 1.2rem;
    color: #47ffe9;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
        color: #00ffab;
    }
`;

const FooterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 32px 0;
`;

const NotFoundMessage = styled.h2`
    font-size: 2rem;
    color: #f00;
    margin-top: 20px;
`;
