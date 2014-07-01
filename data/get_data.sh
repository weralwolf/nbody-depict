#!/bin/bash

declare -a data_files=("_3_in_nbody_output" "_3_issues_by_topics_coloring_map" "_3_issues_cheat__coloring_map" \
	"_3_issues_cheat_sq_constant__coloring_map" "_3_issues_coloring_map" "_3_issues_f=0002_nbody_output" \
	"_3_issues_f=0015_nbody_output" "_3_issues_f=005_nbody_output" "_3_issues_fake_nbody_output" \
	"_3_issues_fsq_nbody_output" "_3_issues_nbody_output" "_3_issues_qub_nbody_output" "_3i3t__coloring_map" \
	"_3i3t_nbody_output" "_3in_small__coloring_map" "_4_in_nbody_output" "_4i__coloring_map" "_4isqf__coloring_map" \
	"_4isqf_nbody_output" "article_colors" "author_colors" "author_colors_diff" "author_colors_hist" "b_output" \
	"enb_output" "groups_coloring" "nbody_output" "nbody_output_6000" "nbody_output_authors-fp=0.005" "nbody_output_authors" \
	"one_color" "r005-nbody_output" "tw_2i_issues" "tw_all_issues" "tweet_all_issues_colors" "tweets_2i_colors" \
	"tweets_3i_output" "tweets_output" "tweets_topic_colors" "user_map" "ddetails" "retweets_coloring" "date_coloring" \
	"issues_agains_coloring" "issues_in_favor_coloring" "groups_agains_coloring" "groups_in_favor_coloring")

base_url='http://dev.weralwolf.com/frontiers/data/'

echo ${#data_files[@]}' files to download'

for i in "${data_files[@]}"
do
	echo 'Downloading '$i'...'
	`wget -c -q $base_url$i.json`
done

echo 'Done.'