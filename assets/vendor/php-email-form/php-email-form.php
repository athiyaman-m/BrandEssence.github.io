<?php
// Set the email address where the form submissions should be sent
$receiving_email_address = 'athiyamanpro@gmail.com';

// Return a JSON error if the request method is not POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method.']);
    exit;
}

// Sanitize and validate form inputs
$name = htmlspecialchars(trim($_POST['name']));
$email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
$subject = htmlspecialchars(trim($_POST['subject']));
$message = htmlspecialchars(trim($_POST['message']));

// Check if all required fields are filled
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode(['error' => 'Please fill in all the required fields.']);
    exit;
}

// Prepare email headers
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Compose the email body
$email_body = "You have received a new message from your website contact form.\n\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Subject: $subject\n";
$email_body .= "Message:\n$message\n";

// Send the email
if (mail($receiving_email_address, $subject, $email_body, $headers)) {
    echo json_encode(['success' => 'Your message has been sent. Thank you!']);
} else {
    echo json_encode(['error' => 'Failed to send your message. Please try again later.']);
}
?>
