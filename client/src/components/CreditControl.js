import Form from 'react-bootstrap/Form';

function CreditControl(props) {

    function handleChange(e) {
        props.setCreditLimit(+e.target.value);
    }

    return (
        <>
            <h4>Your credit limit</h4>
            <Form className="pb-4">
                <Form.Group controlId="creditControlInput">
                    <Form.Label>Please change the number above to update the max. number of credits (Default: 15)</Form.Label>
                    <Form.Control
                        type="text"
                        className="w-25"
                        placeholder="Max. credits"
                        value={props.creditLimit}
                        onChange={(e) => handleChange(e)}
                    />
                </Form.Group>
            </Form>
        </>
    )
}

export default CreditControl;