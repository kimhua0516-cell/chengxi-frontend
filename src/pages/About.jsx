import { useEffect, useState } from 'react';
import { getMilestones, getTeam } from '../api';
import './About.css';

export default function About() {
  const [milestones, setMilestones] = useState([]);
  const [team, setTeam] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    Promise.all([getMilestones(), getTeam()])
      .then(([m, t]) => {
        setMilestones(m);
        setTeam(t);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div className="about-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">关于晨曦科技</p>
          <h1>我们从一个简单的想法开始：服务不该让人等待</h1>
          <p className="page-hero-desc">
            2021 年，三位创始人在一间小办公室里，决定用 AI 和设计的力量，
            帮助企业把客户服务和品牌网站做得更好、更快、更值得信赖。
          </p>
        </div>
      </section>

      {status === 'error' && (
        <div className="container">
          <p className="services-status services-status-error">
            暂时无法加载公司信息，请确认后端服务是否已启动。
          </p>
        </div>
      )}

      {/* 公司起源 / 时间线 */}
      <section className="section-tight">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">发展历程</p>
            <h2>从一间办公室，到服务上千家企业</h2>
          </div>

          <div className="timeline">
            {milestones.map((m) => (
              <div key={m.id} className="timeline-item">
                <div className="timeline-marker">
                  <span className="timeline-year">{m.year}</span>
                </div>
                <div className="timeline-content">
                  <h3>{m.title}</h3>
                  <p>{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 价值观 */}
      <section className="section-tight values-band">
        <div className="container values-grid">
          <div className="value-card">
            <div className="value-icon">☀️</div>
            <h3>服务要有温度</h3>
            <p>技术是手段，让客户感受到被重视，才是我们真正在意的事。</p>
          </div>
          <div className="value-card">
            <div className="value-icon">⚡</div>
            <h3>快，但不将就</h3>
            <p>响应速度重要，但每一个答案都要准确、可靠、经得起追问。</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🌱</div>
            <h3>和客户一起成长</h3>
            <p>我们把客户的反馈当作产品迭代的起点，长期陪伴而非一次性交付。</p>
          </div>
        </div>
      </section>

      {/* 团队 */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">核心团队</p>
            <h2>一支既懂技术、也懂服务的团队</h2>
          </div>

          <div className="team-grid">
            {team.map((member) => (
              <div key={member.id} className="team-card">
                <div
                  className="team-avatar"
                  style={{ background: member.avatar_color }}
                  aria-hidden="true"
                >
                  {member.name.slice(0, 1)}
                </div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
