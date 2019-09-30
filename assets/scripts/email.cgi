#!/usr/bin/perl

# A simple Perl-based CGI email handler. 
#
# Copyright 2004 Boutell.Com, Inc. Compatible with our earlier C program.
#
# Released under the same license terms as Perl 5 itself.
#
# We ask, but do not require, that you link to 
# http://www.boutell.com/email/ when using this script or a 
# variation of it.

use CGI;

my $sendmail = "/usr/sbin/sendmail";

# Parse any submitted form fields and return an object we can use
# to retrieve them
my $query = new CGI;

my $name = &veryclean($query->param('name'));
my $email = &veryclean($query->param('email'));
my $subject = &clean($query->param('subject'));
#newlines allowed
my $message = &clean($query->param('message'));
my $to = &veryclean('mike.macmullin@audiles.net');
my $from = &veryclean('mike.macmullin@bellaliant.net');

#Note: subject is not mandatory, but you can easily change that
if (($name eq "") || ($email eq "") || ($message eq ""))
{
    &error("Email Rejected", "Please fill out all fields provided.");
}

# Open a pipe to the sendmail program
open(OUT, "|$sendmail -f mike.macmullin -t");
# Use the highly convenient <<EOM notation to include the message
# in this script more or less as it will actually appear
print OUT <<EOM
From: $from
To: $to
Subject: $subject
Reply-To: $email
Supposedly-From: $name
[This message was sent through a www-email relay.]

$message
EOM
;
close(OUT);

&success();

exit 0;

sub clean
{
    # Clean up any leading and trailing whitespace
    # using regular expressions.
    my $s = shift @_;
    $s =~ s/^\s+//;
    $s =~ s/\s+$//;
    return $s;
}

sub veryclean
{
    # Also forbid newlines by folding all internal whitespace to
    # single spaces. This prevents faking extra headers to cc 
    # extra people.
    my $s = shift @_;
    $s = &clean($s);
    $s =~ s/\s+$/ /g;
    return $s;
}

sub success
{
    # Output success
    print $query->header;
    print "success";
    exit 0;
}

sub error
{
    # Output the error message
    my($title, $content) = @_;
    print $query->header;
    print <<EOM
$title $content
EOM
;
    exit 0;
}

