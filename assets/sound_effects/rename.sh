for filename in *.wav; do
	var=$(echo $filename | sed s/......__littlerobotsoundfactory__//g)
	mv $filename $var
	
done
