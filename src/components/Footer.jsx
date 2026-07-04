import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="navbar-logo-mark">晨</div>
          <div>
            <p className="footer-name">晨曦科技</p>
            <p className="footer-tagline">用 AI，让每一次服务都有温度</p>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <p className="footer-heading">产品</p>
            <Link to="/services">AI 智能客服</Link>
            <Link to="/services">企业官网建设</Link>
            <Link to="/services">数字化咨询</Link>
          </div>
          <div>
            <p className="footer-heading">公司</p>
            <Link to="/about">关于我们</Link>
            <Link to="/about">团队介绍</Link>
            <Link to="/contact">联系方式</Link>
          </div>
          <div>
            <p className="footer-heading">联系</p>
            <span className="footer-text">hello@chenxi-tech.com</span>
            <span className="footer-text">+86 400-800-1234</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} 晨曦科技. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
}
