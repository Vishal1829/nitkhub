import React from 'react';
import Avatar from 'react-bootstrap-icons/dist/icons/person-circle'
import background from '../assets/images/background.jpg'
function LeftPanel({ fullname, email }) {

    const tagItem = (tag) => (
        <a key={tag.id} className="tag_title" href={tag.link}>
            {tag.title}
        </a>
    )

    const tags = [
        {
            id: 128,
            title: 'My Questions',
            link: '/userQuestions'
        },
        {
            id: 129,
            title: 'My Answers',
            link: '/userAnswers'
        }
    ]

    return (
        <div className="left_panel" >
            <a href="/profile">
                <div className="left_top">
                    <img src={background} alt="" className="back-img" />
                    <Avatar size={45} className="sidebar_avatar" />
                    <h2>{fullname}</h2>
                    <h4>{email}</h4>
                </div>
            </a>
            <div className="left_bottom">
                <p>Profile Options</p>
                <div className="tag_items">
                    {
                        tags.map((tag) => tagItem(tag))
                    }
                </div>
            </div>
        </div>
    );
}

export default LeftPanel;