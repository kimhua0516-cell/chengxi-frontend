import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../api';
import './Services.css';

export default function Services() {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getServices()
      .then((data) => {
        setServices(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div className="services-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">我们的服务</p>
          <h1>从对话到页面，一站式支持你的数字化第一步</h1>
          <p className="page-hero-desc">
            我们专注两件事：让客户咨询得到更快回应，让企业官网看起来更值得信赖。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {status === 'loading' && <p className="services-status">正在加载服务信息…</p>}
          {status === 'error' && (
            <p className="services-status services-status-error">
              暂时无法加载服务数据，请确认后端服务是否已启动。
            </p>
          )}

          <div className="services-list">
            {services.map((s, idx) => (
              <div
                key={s.id}
                className={`services-row ${idx % 2 === 1 ? 'services-row-reverse' : ''}`}
              >
                <div className="services-row-copy">
                  <div className="service-icon service-icon-lg">{s.icon}</div>
                  <h2>{s.title}</h2>
                  <p>{s.description}</p>
                  <ul className="services-features">
                    {s.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn btn-primary">
                    咨询这项服务
                  </Link>
                </div>
                <div className="services-row-visual" aria-hidden="true">
                  <div className={`services-visual-card services-visual-${idx % 3}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
