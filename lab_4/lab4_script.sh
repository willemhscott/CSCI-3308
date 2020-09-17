#!/bin/bash
# Authors : Willem Scott
# Date: 09/17/2020

cp /var/log/syslog ~/
egrep -i "error" ~/syslog | tee error_log_check.txt
#echo "Check out this error log" | mail -s 'Error loggerino' willem.scott@colorado.edu -a error_log_check.txt
#echo "beans" | mail -s "Error loggerino" willem.scott@colorado.edu
echo "Check out this sick error log" | mail -s "Error loggerino" -A error_log_check.txt willem.scott@colorado.edu
