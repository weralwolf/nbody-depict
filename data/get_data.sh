#!/bin/bash

declare -a data_files=("_3_in_nbody_output.json" "_3_issues_by_topics_coloring_map.json" "_3_issues_cheat__coloring_map.json" "_3_issues_cheat_sq_constant__coloring_map.json" "_3_issues_coloring_map.json" "_3_issues_f=0002_nbody_output.json" "_3_issues_f=0015_nbody_output.json" "_3_issues_f=005_nbody_output.json" "_3_issues_fake_nbody_output.json" "_3_issues_fsq_nbody_output.json" "_3_issues_nbody_output.json" "_3_issues_qub_nbody_output.json" "_3i3t__coloring_map.json" "_3i3t_nbody_output.json" "_3in_small__coloring_map.json" "_4_in_nbody_output.json" "_4i__coloring_map.json" "_4isqf__coloring_map.json" "_4isqf_nbody_output.json" "article_colors.json" "author_colors.json" "author_colors_diff.json" "author_colors_hist.json" "b_output.json" "enb_output.json" "groups_coloring.json" "nbody_output.json" "nbody_output_6000.json" "nbody_output_authors-fp=0.005.json" "nbody_output_authors.json" "one_color.json" "r005-nbody_output.json" "tw_2i_issues.json" "tw_all_issues.json" "tweet_all_issues_colors.json" "tweets_2i_colors.json" "tweets_3i_output.json" "tweets_output.json" "tweets_topic_colors.json" "user_map.json")

base_url='http://dev.weralwolf.com/frontiers/data/'

echo ${#data_files[@]}' files to download'

for i in "${data_files[@]}"
do
	echo 'Downloading '$i'...'
	`wget -c -q $base_url$i`
done

echo 'Done.'