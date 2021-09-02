import React, { Component } from 'react';
import DishDetail from './DishDetails';
import MenuItem from './MenuItem';
import { CardColumns, Modal, ModalBody, ModalFooter, Button, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { addComment, fetchDishes, fetchComments } from '../../redux/actionCreators';
import Loading from './Loading';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: (dishId, rating, author, comment) => dispatch(
            addComment(dishId, rating, author, comment)),
        fetchDishes: () => dispatch(fetchDishes()),
        fetchComments: () => dispatch(fetchComments())
    }
}
class Menu extends Component {
    state = {
        selectedDish: null,
        toogle: true,
        modalOpen: false
    }

    onDishSelect = (dish) => {
        this.setState(
            {
                selectedDish: dish,
                modalOpen: !this.state.modalOpen
            }
        )
    }

    toogleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    toogleDish = () => {
        this.setState(
            {
                toogle: !this.state.toogle
            }
        )
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
    }

    render() {
        document.title = "Menu";
        let menu = null
        if (this.props.dishes.isLoading) {
            return (
                <Loading />
            )
        }
        else if (this.props.dishes.errMess != null) {
            return (
                <Alert color="danger"> {this.props.dishes.errMess} </Alert>
            )
        }
        else {
            if (this.state.toogle) {
                menu = this.props.dishes.dishes.map((item) => {
                    return (
                        <MenuItem dish={item}
                            key={item.id}
                            DishSelect={
                                () => this.onDishSelect(item)}
                        />
                    )
                })
            }

            let dishDetail = null;
            if (this.state.selectedDish != null) {
                const comments = this.props.comments.comments.filter(comment => {
                    return comment.dishId === this.state.selectedDish.id;
                });
                dishDetail = <DishDetail
                    dish={this.state.selectedDish}
                    comments={comments}
                    addComment={this.props.addComment}
                    commentIsLoading={this.props.comments.isLoading}
                />
            }
            return (
                <div className="container">
                    <button style={{ textAlign: 'center', margin: '10px' }}
                        onClick={this.toogleDish} >Toogle Dish</button>
                    <div className="row">
                        <CardColumns>{menu}</CardColumns>
                        <Modal isOpen={this.state.modalOpen}>
                            <ModalBody>
                                {dishDetail}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={this.toogleModal}>
                                    Close
                        </Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);