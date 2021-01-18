import React from 'react'
import { Button, Icon, Form, Card, Message} from 'semantic-ui-react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import ErrorBoundary from '../../util/ErrorBoundary'
import {getNumber} from '../../action/generatorAction'
class Generator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            min:1,
            max:100
        };
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    getGeneratedNumber= e=>{
        e.preventDefault()
        this.props.getNumber({min:this.state.min,max:this.state.max});
    }

    render() {
        const {errors} = this.props
        return (
            <React.Fragment>
                <ErrorBoundary msg="Something went wrong with generated number ... sorry.">
                    {this.props.errors.unreachable? <Message negative>
                        <Message.Header>Back end is unreachable</Message.Header>
                        <p>{this.props.errors.unreachable}</p>
                    </Message>:''}
                </ErrorBoundary>
                <Card.Group centered>
                    <Card>
                        <Card.Content>
                            <Card.Header>RNG v.{VERSION}</Card.Header>
                            <Card.Meta>Random Number Generator</Card.Meta>
                            <Card.Description>
                                RNG tool generate random number based on provided range.
                            </Card.Description>
                            <Card.Description>
                                <strong>Instruction:</strong>
                                <ol>
                                    <li>Fill minimum or leave it as it</li>
                                    <li>Fill maximum or leave it as it</li>
                                    <li>Be bold and press the button!</li>
                                </ol>
                            </Card.Description>
                            <Card.Description>
                                <Form>
                                    <Form.Input
                                        placeholder="1"
                                        label="Minimum"
                                        fluid
                                        name="min"
                                        idx={1}
                                        error={errors.min?errors.min:null}
                                        value={this.state.min}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Input
                                        placeholder="100"
                                        label="Maximum"
                                        fluid
                                        name="max"
                                        idx={2}
                                        error={errors.max?errors.max:null}
                                        value={this.state.max}
                                        onChange={this.handleChange}
                                    />
                                </Form>
                            </Card.Description>
                            <Card.Description>
                                <ErrorBoundary msg="Something went wrong with generated number ... sorry.">
                                    {this.props.generator.number? "Generated number: " + this.props.generator.number:<span>&nbsp;</span>}
                                </ErrorBoundary>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                            <Button onClick={this.getGeneratedNumber}  color="green">
                                <Icon name="cogs" />
                                Generate {this.props.generator.isLoading? " ...loading":""}
                            </Button>
                            </div>
                        </Card.Content>
                    </Card>
                    </Card.Group>
            </React.Fragment>
        );
    }
}
Generator.propTypes = {
    generator: PropTypes.object.isRequired,
    getNumber:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    generator: state.generator,
    errors: state.error
})

export default connect(mapStateToProps,{getNumber})(Generator);
