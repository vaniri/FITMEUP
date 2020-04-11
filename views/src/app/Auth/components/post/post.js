import React, { Component } from 'react';
import axios from 'axios';
import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './post.css';

class PostContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }

    getUserPosts = async () => {
        const res = await axios.get(this.props.reqUrl);
        if (res.status === 200) {
            if (this.props.reqType === "multi") {
                this.setState({ posts: res.data.posts });
            } else if (this.props.reqType === "single") {
                this.setState({ posts: [res.data] });
            } else {
                console.error("Unknown post url type", this.props.reqType);
            }
        }
        else if (res.status === 404) {
            alert("No posts found");
        } else {
            console.log("FAIL get posts", res.status);
        }
    }

    componentDidMount() {
        this.getUserPosts();
    }

    render() {
        console.log(this.state.posts);
        return (
            <Container fluid="lr">
                <Row className="posts-container">
                    <h4>Latest Posts:</h4>
                    {this.state.posts.map(post => (
                        <Col>
                            <h5>{post.title}</h5>
                            <p className="content" dangerouslySetInnerHTML={{ __html: post.content }}></p>
                            <hr />
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}

export default PostContainer;
