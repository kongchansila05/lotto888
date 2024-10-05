$(function() {
  
    list_data();
    
  });
  
  function show_betdetail(bet_id,self){
      
      var offset = $(self).offset();
      var position = $(self).position();
      
      var scroll_top = $('.main_content_betlist').scrollTop();
      
      var top = position.top + scroll_top;
      
      // console.log(position.top,scroll_top);
      
      $("#betdetail").css("top",(top + 30));
      $("#betdetail").css("left",120);
      
      
      $('#divLoadingDetail').css("display","block");
      $("#tdetail").html('');
      
      $("#parlay_title").text('Mix Palay {0}'.format($(self).text()))
      
      $("#betdetail").show();
          
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": api + "sport/bet_detail/?bet_id="+ bet_id,
        "method": "GET",
        "headers": {
          "Authorization": "sid " + $.cookie("sid"),
          "Content-Type": "application/json",
        },
          "processData": false
      }
      
      // console.log(settings);
      
      $.ajax(settings).done(function (response) {
          
          data = new Array();
          data = response;
          
          // console.log(data);
          
          option_html = '';
          group_row_type = 'group_row_odd';
          
          for (var i = 0 ; i < data.length; i++) {
            
            option_html += '<div id=ca-{0} class="collapsable collapsable-accordion {1}">'.format(i+1,group_row_type);
            option_html += '<h4 class="ca-control group"><a style="color:blue;padding:0px;" href="#ca-{0}">{1}</a></h4>'.format(i+1,data[i].group);
            
            if (group_row_type=='group_row_odd')
              group_row_type = 'group_row_even';
            else
              group_row_type = 'group_row_odd';
            
            option_html += '<div class="ca-box">';
            
            rows = data[i].rows;
            
            detail_html ='<table class="detail_bet_row_table">';
            
            // console.log(rows)
            
            for (var j = 0 ; j < rows.length; j++) {
              
              match = rows[j].detail;
              
              detail_html += '<tr style="background-color:#fff"> ';
              detail_html += '<td rowspan={1} style="width:25px;">{0}</td>'.format(j+1,match.length);
              
              // total_odds_row = 0;  
              
              for (var m = 0 ; m < match.length; m++) {
                
                hdp_color = 'font-weight:bold;color:#27448c;';
                var hdp = match[m].bet_hdp_html.toString();
                var red = hdp.indexOf('-');
                if (red >=0)
                  hdp_color = 'font-weight:bold;color:#900;';
                
                if (match[m].bet_team == "Over")
                  hdp_color = 'font-weight:bold;color:#900;';
                  
                bet_data = '<div><span style="{1}">{0}</span>'.format(match[m].bet_team,hdp_color);
                
                bet_data += '<span style="{1}"> {0}</span>'.format(match[m].bet_hdp_html,hdp_color);
                bet_data += '</div>';
                bet_data += '<div>{0}</div>'.format(match[m].bet_info_type_text);
                
            
                home_color = '';
                away_color = '';
                
                
                if (match[m].fav == 1)
                {
                  home_color = 'color:#900;font-weight:bold;';
                  away_color = 'color:#27448c;font-weight:bold;';
                }
                else{
                  away_color = 'color:#900;font-weight:bold;';
                  home_color = 'color:#27448c;font-weight:bold;';
                }
                
                bet_data += '<span style="{1}">{0}</span>'.format(match[m].HomeTeamName,home_color);
                bet_data += ' -vs- ';
                bet_data += '<span style="{1}">{0}</span>'.format(match[m].AwayTeamName,away_color);
                
                
                bet_data += '<div>{0} @ {1}</div>'.format(match[m].LeagueName,match[m].StatementDate);
                bet_data += '<div>{0}</div>'.format(match[m].sport_type);
                
                detail_html += '<td style="padding-right:5px;width:242px;text-align:right;background-color:#fff">{0}</td>'.format(bet_data);
                
                detail_html += '<td style="background-color:#fff;width:32px;font-weight:bold">{0}</td>'.format(match[m].odds);
                
                // total_odds_row += parseFloat(match[m].odds);
                
                if (m == 0){
                  
                  color_red = ((rows[j].winlose<0)?"color:red":"");
                  
                  detail_html += '<td rowspan={1} style="background-color:#fff;width:50px;font-weight:bold">{0}</td>'.format(financial(rows[j].total_odds),match.length);
                  detail_html += '<td rowspan={1} style="background-color:#fff;width:40px;">{0}</td>'.format(financial(rows[j].stake),match.length);
                  detail_html += '<td rowspan={1} style="background-color:#fff;width:40px;{2}">{0}</td>'.format(financial(rows[j].winlose),match.length,color_red);  
                  
                }
                
                detail_html += '<td style="background-color:#fff;width:40px;">';
                
                winlose_detail= '';
                
                if (match[m].cal_status == "calculated"){
                  
                  color_red = ((match[m].winlose_score == '-1' || match[m].winlose_score == '-0.5')?"color:red":"");
                  
                  winlose_detail = '<span style="{1}">{0}</span>'.format(match[m].winlose_score_text,color_red);
                  winlose_detail += '<span style="display:block">FT:{0}:{1}</span>'.format(match[m].fthomescore,match[m].ftawayscore);
                  winlose_detail += '<span style="display:block">FH:{0}:{1}</span>'.format(match[m].fhhomescore,match[m].fhawayscore);  
                }
                
                detail_html += winlose_detail;  
                  
                detail_html += '</td>';
                
                detail_html += '</tr>';
                
              }
              
              // detail_html = detail_html.replace('total_odds_row',financial(total_odds_row));
              
              
              
            }
            
            detail_html +='</table>';
            
            option_html += detail_html;
            
            option_html += '</div>';
            
            option_html += '</div>';
              
          }
          
          $("#tdetail").html(option_html);
          
          // console.log(data)
          
          
          $('.collapsable-basic').collapsable();
          
          $('.collapsable-toggle').collapsable({
            fx: 'toggle'
          });
          
          $('.collapsable-slide').collapsable({
            fx: 'slide',
            fxDuration: 300
          });
          
          $('.collapsable-accordion').collapsable({
            accordion: true,
            fx: 'slide',
            fxDuration: 300
          });
          
          $('#divLoadingDetail').css("display","none");
          
        
      })
      .fail(function(){
          
          // $('#dialog-message').text('something went wrong!');
          // $('#dialog').dialog();
          console.log(response);
      })
      ;    
      
      
      // console.log($(self).position());
      
  }
  
  function get_font_color(amt){
      if (amt <0)
          return "redFont"
      return ""
  }
  
  function close_betdetail(){
      $("#betdetail").hide();
  }
  
  function list_data(){
    
    $('#divReportDetail').css('display','none');
    $('#divReport').css('display','block');
    $('#divLoading').css("display","block");
    $('#tbetlist').empty();
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": api + "user-auth/account_statement/",
        "method": "GET",
        "headers": {
          "Authorization": "sid " + $.cookie("sid"),
          "Content-Type": "application/json",
        },
          "processData": false
      }
      
      // console.log(settings);
      
      $.ajax(settings).done(function (response) {
          
          data = new Array();
          data = response;
          
          // console.log(response);
          
          add_data_table(data);
          
          $('#divLoading').css("display","none");
          
      })
      .fail(function(){
          console.log(response);
          $('#divLoading').css("display","none");
      })
      ;
      
    
  }
  
  function add_data_table(data){
    
    tblcontent = '';
    
    for (var i = 0 ; i < data.length; i++) {
            
      tblcontent_row = '<tr class="main_table_odd" style="font-weight:bold">';
      tblcontent_row += '<td>{0}</td>'.format(i+1);
      
      tblcontent_row += '<td>';
      tblcontent_row += '<span>{0}</span>'.format(data[i].balance_date);
      tblcontent_row += '</td>';
      
      
      tblcontent_row += '<td>';
      tblcontent_row += '<span>{0}</span>'.format(data[i].remark);
      tblcontent_row += '</td>';
      
      tblcontent_row += '<td class="td-right">';
      tblcontent_row += '<a href="javascript:void(0)"';
      tblcontent_row += 'onclick="statement_by_game(\'{0}\')" style="color:#000;text-decoration:underline;">'.format(ibc_date_format(data[i].balance_date));
      tblcontent_row += '<span>{0}</span>'.format(ibc_amt_format(data[i].turnover));
      tblcontent_row += '</a>';
      tblcontent_row += '</td>';
      
      tblcontent_row += '<td class="td-right">';
      tblcontent_row += '<span>{0}</span>'.format(ibc_amt_format(data[i].valid_turnover));
    
      tblcontent_row += '</td>';
      
      color_red = ((data[i].net_winlose<0)?"color:red":"");
      
      tblcontent_row += '<td class="td-right">';
      tblcontent_row += '<span style="{1}">{0}</span>'.format(ibc_amt_format(data[i].net_winlose),color_red);
      tblcontent_row += '</td>';
      
      tblcontent_row += '<td class="td-right">';
      tblcontent_row += '<span>{0}</span>'.format(financial(0));
      tblcontent_row += '</td>';
      
      tblcontent_row += '<td class="td-right">';
      tblcontent_row += '<span>{0}</span>'.format(ibc_amt_format(data[i].deposit));
      tblcontent_row += '</td>';
      
      tblcontent_row += '<td class="td-right">';
      tblcontent_row += '<span>{0}</span>'.format(ibc_amt_format(data[i].withdraw));
      tblcontent_row += '</td>';
      
      tblcontent_row += '<td class="td-right">';
      tblcontent_row += '<span>{0}</span>'.format(ibc_amt_format(data[i].balance));
      tblcontent_row += '</td>';
      
      
      tblcontent_row += '</tr>';
      
      tblcontent += tblcontent_row;
      
    };
    
    $("#tbetlist").append(tblcontent);
    
  }
  
  function add_data_table_betlist(data){
    
    t_stake=0;
    t_winlose=0;
    
    for (var i = 0 ; i < data.length; i++) {
            
      tblcontent_row = '<tr style="background-color:#fff;">';
      tblcontent_row += '<td>{0}</td>'.format(i+1);
      
      tblcontent_row += '<td>';
      tblcontent_row += '<span>{0}</span><br/>'.format(data[i].username);
      tblcontent_row += '<span style="color:blue;font-weight:bold">{0}</span><br/>'.format(data[i].id);
      tblcontent_row += '<span>{0}</span><br/>'.format(data[i].game);
      tblcontent_row += '<span>{0}</span><br/>'.format(data[i].created_date);
      tblcontent_row += '<span>{0}</span><br/>'.format(data[i].created_time);
      tblcontent_row += '</td>';
      
      if (data[i].bet_type.toLowerCase() == "handicap"){
          
          tblcontent_row += '<td>';
          
          tblcontent_row_1 = '<div class="bet_diplay_height">';
          tblcontent_row_1 += '<span class="bet_selection">';
          
          hdp_color = 'color:#27448c;';
          var hdp = data[i].detail.bet_hdp_html.toString();
          var red = hdp.indexOf('-');
          if (red >=0)
            hdp_color = 'color:#900;';
            
          if (data[i].detail.bet_team == "Over")
              hdp_color = 'color:#900;';
            
          tblcontent_row_1 += '<span style="font-weight:bold;{1}">{0} </span>'.format(data[i].detail.bet_team,hdp_color);
          
          tblcontent_row_1 += '<span style="font-weight:bold;{1}">{0}</span>'.format(data[i].detail.bet_hdp_html,hdp_color);
          
          tblcontent_row_1 += '</span>';
          tblcontent_row_1 += '</div>';
          
          match_type = '';
          score = '';
          if (data[i].detail.match_type == 'live'){
            match_type = data[i].detail.match_type + "!";
            score = '{0}:{1}'.format(data[i].detail.home_score,data[i].detail.away_score);
          }
          
          tblcontent_row_2 = '<div class="bet_diplay_height">';
          tblcontent_row_2 += '<span class="bet_selection">';
          tblcontent_row_2 += '<span style="font-style:italic;">{0} </span>'.format(data[i].detail.bet_info_type_text);
          tblcontent_row_2 += ' {0} {1}'.format(match_type,score);
          tblcontent_row_2 += '</span>';
          tblcontent_row_2 += '</div>';
          
          tblcontent_row_3 = '<div class="bet_diplay_height">';
          tblcontent_row_3 += '<span class="bet_selection">';
          
          home_color = '';
          away_color = '';
          
          if (data[i].detail.fav == 1)
          {
            home_color = 'color:#900;font-weight:bold;';
            away_color = 'color:#27448c;font-weight:bold;';
          }
          else{
            away_color = 'color:#900;font-weight:bold;';
            home_color = 'color:#27448c;font-weight:bold;';
          }
          
          tblcontent_row_3 += '<span style="{1}">{0}</span>'.format(data[i].detail.HomeTeamName,home_color);
          tblcontent_row_3 += ' -vs- ';
          tblcontent_row_3 += '<span style="{1}">{0}</span>'.format(data[i].detail.AwayTeamName,away_color);
          
          tblcontent_row_3 += '</span>';
          tblcontent_row_3 += '</div>';
          
          tblcontent_row_4 = '<div class="bet_diplay_height">';
          tblcontent_row_4 += '<span class="bet_selection">{0}'.format(data[i].detail.LeagueName);
          tblcontent_row_4 += ' @ {0}</span>'.format(data[i].report_date);
          tblcontent_row_4 += '</div>';
          
          // tblcontent_row_5 = '<div class="bet_diplay_height">';
          // tblcontent_row_5 += '<span class="bet_selection">{0}'.format(data[i].report_date);
          // tblcontent_row_5 += '</span>';
          // tblcontent_row_5 += '</div>';
          
          tblcontent_row_6 = '<div class="bet_diplay_height">';
          tblcontent_row_6 += '<span class="bet_selection">';
          tblcontent_row_6 += '<span style="color:red">{0}</span>'.format(data[i].sport_type);
          tblcontent_row_6 += '</span>';
          tblcontent_row_6 += '</div>';
          
          
          tblcontent_row +=  tblcontent_row_1;
          tblcontent_row +=  tblcontent_row_2;
          tblcontent_row +=  tblcontent_row_3;
          tblcontent_row +=  tblcontent_row_4;
          // tblcontent_row +=  tblcontent_row_5;
          tblcontent_row +=  tblcontent_row_6;
          
          tblcontent_row += '</td>';
          
      }
      else {
          tblcontent_row += '<td>';
          
          tblcontent_row += '<div class="bet_diplay_height">';
          tblcontent_row += '<span class="bet_selection">'
          tblcontent_row += '<a href="javascript:void(0)"';
          tblcontent_row += 'onclick="show_betdetail({0},this)" style="color:#900;decoration:underline;">{1}'.format(data[i].id,data[i].option);
          tblcontent_row += '</a>';
          tblcontent_row += '</span>';
          tblcontent_row += '</div>';
          
          tblcontent_row += '<div class="bet_diplay_height">';
          tblcontent_row += '<span class="bet_selection">';
          tblcontent_row += '<span style="font-style:italic;">{0}</span>'.format(data[i].bet_type);
          tblcontent_row += '</span>';
          tblcontent_row += '</div>';
          
          tblcontent_row += '<div class="bet_diplay_height"></div>';
          
          tblcontent_row += '<div class="bet_diplay_height">';
          tblcontent_row += '<span class="bet_selection">';
          tblcontent_row += '<span style="">{0}</span>'.format(data[i].report_date);
          tblcontent_row += '</span>';
          tblcontent_row += '</div>';
          
          tblcontent_row += '<div class="bet_diplay_height">';
          tblcontent_row += '<span class="bet_selection">';
          tblcontent_row += '<span style="color:red">{0}</span>'.format(data[i].sport_type);
          tblcontent_row += '</span>';
          tblcontent_row += '</div>';
          
          
          tblcontent_row += '</td>';
        
      }
      
      tblcontent_row += '<td>';
      tblcontent_row += '<span style="display:block">{0}</span>'.format(data[i].total_odds);
      tblcontent_row += '<span>{0}</span>'.format(data[i].oddsCategory_text);
      tblcontent_row += '</td>';
      
      tblcontent_row += '<td>';
      tblcontent_row += '<span>{0}</span>'.format(ibc_amt_format(data[i].amount));
      tblcontent_row += '</td>';
      
      
      color_red = ((data[i].wamt<0)?"color:red":"");
      
      tblcontent_row += '<td>';
      tblcontent_row += '<span style="{1}">{0}</span>'.format(ibc_amt_format(data[i].wamt),color_red);
      tblcontent_row += '</td>';
      
      
      winlose_detail= '';
      
      detail = data[i].detail
      
      if (data[i].bet_type.toLowerCase() == "handicap")
      {
        color_red = get_font_color(data[i].wamt);
        
        // winlose_detail += '<span style="{1}">{0}</span>'.format(detail.winlose_score_text,color_red);
        
        if (data[i].status.toLowerCase() != "accepted")
          {
          winlose_detail += '<span><font class="redFont">{0}</font></span>'.format(data[i].status);    
          }
        else{
          winlose_detail += '<span><font class="{1}">{0}</font></span>'.format(detail.winlose_score_text,color_red);      
        }
        
        winlose_detail += '<span style="display:block">FT:{0}:{1}</span>'.format(detail.fthomescore,detail.ftawayscore);
        winlose_detail += '<span style="display:block">FH:{0}:{1}</span>'.format(detail.fhhomescore,detail.fhawayscore);  
      }
      else{
        if (data[i].wamt < 0){
          winlose_detail += '<span style="color:red">Lose</span>';
        }
        else{
          winlose_detail += '<span>Win</span>';
        }
      }
      
      
      tblcontent_row += '<td>';
      tblcontent_row += '<span>{0}</span>'.format(winlose_detail);
      tblcontent_row += '</td>';
      
      
      tblcontent_row += '</tr>';
      
      $("#tbetlist-detail").append(tblcontent_row);
      
      t_stake+=data[i].amount;
      t_winlose+=data[i].wamt;
      
      
    };
    
    if (data.length > 0)
    {
      tblcontent_row = '<tr style="background-color:#fff;height:30px;">';
      
      tblcontent_row += '<td colspan="4"><b>TOTAL</td>';
      
      color_red = ((t_stake<0)?"color:red":"");
      tblcontent_row += '<td style="{1}"><b>{0}</td>'.format(ibc_amt_format(t_stake),color_red);
      
      color_red = ((t_winlose<0)?"color:red":"");
      tblcontent_row += '<td style="{1}"><b>{0}</td>'.format(ibc_amt_format(t_winlose),color_red);
      
      tblcontent_row += '<td></td>';
      tblcontent_row += '</tr>';
      
      $("#tbetlist-detail").append(tblcontent_row);
      
    }
    
  }
  
  function statement_detail_by_game(game_id,date){
    
    $('#divReport').css('display','none');
    $('#divReportDetail').css('display','block');
    $('#divLoadingReportDetail').css("display","block");
    
    $('#tbl-winlose_by_game').css('display','none');
    
    
    fr_date = date;
    to_date = date;
    page = 1;
      
    if (game_id == 1)
        report_name = api + "sport/bet/?";
    else if (game_id == 2)
        report_name = api + "sexy_baccarat/bet/?";
    else if (game_id == 3)
        report_name = api + "cock/bet/?";
    else if (game_id == 4)
        report_name = api + "keno/bet_list/?page_size=1000&";
    else if (game_id == "5")
        report_name = api + "joker/bet_list/?page_size=1000&";
    
    // console.log(fr_date,to_date);
    
    params = "page={2}&fdate={0}&tdate={1}".format(fr_date,to_date,page);
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": report_name + "{0}".format(params),
        "method": "GET",
        "headers": {
          "Authorization": "sid " + $.cookie("sid"),
          "Content-Type": "application/json",
        },
          "processData": false
      }
      
      // console.log(settings);
      
    $.ajax(settings).done(function (response) {
        
        data = new Array();
        data = response['results'];
        
        console.log(data,response['results']);
        
        $("#txtGameid").val(game_id);
        
        generate_column_header_by_game(game_id);
        
        add_data_table_detail_by_game(game_id,data);
        
        $('#divLoadingReportDetail').css("display","none");
        
    })
    .fail(function(){
        console.log(response);
        $('#divLoading').css("display","none");
    });
    
    
  }
  
  function statement_by_game(date){
    
    $('#divReport').css('display','none');
    $('#divReportDetail').css('display','block');
    $('#divLoadingReportDetail').css("display","block");
    
    $('#tbl-winlose_by_game_body').empty();
    
    
    $("#txtGameid").val('');
    $("#txtDate").val(date);
    
    fr_date = date;
    to_date = date;
    page = 1;
    
    // console.log(fr_date,to_date);
    
    params = "page={2}&fdate={0}&tdate={1}".format(fr_date,to_date,page);
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": api + "user-auth/win_report_member/?{0}".format(params),
        "method": "GET",
        "headers": {
          "Authorization": "sid " + $.cookie("sid"),
          "Content-Type": "application/json",
        },
          "processData": false
      }
      
      // console.log(settings);
      
    $.ajax(settings).done(function (response) {
        
        data = new Array();
        data = response['results'];
        
        // console.log(data);
        
        add_data_to_table_by_game(data,date);
        
        $('#divLoadingReportDetail').css("display","none");
        
    })
    .fail(function(){
        console.log(response);
        $('#divLoading').css("display","none");
    });
    
    
  }
  
  function add_data_to_table_by_game(data,date){
    
    total_turnover=0;
    total_valid=0;
    total_winlose=0;
    total_comm=0;
    total_net_winlose=0;
    
    for (var i = 0 ; i < data.length; i++) {
      
      total_turnover+=data[i].turnover;
      total_valid+=data[i].valid_turnover;
      total_winlose+=data[i].winlose_member;
      total_comm+=data[i].commission_member;
      total_net_winlose+=data[i].total_member;
            
      tblcontent_row = '<tr style="background-color:#fff;height:23px;">';
      
      tblcontent_row += '<td>';
      // tblcontent_row += '<span>{0}</span><br/>'.format(data[i].game_name);
      tblcontent_row += '<a href="javascript:void(0)"';
      tblcontent_row += 'onclick="statement_detail_by_game({0},\'{1}\')" style="color:#000;text-decoration:underline;">'.format(data[i].game_id,date);
      tblcontent_row += '{0}</a>'.format(data[i].game_name);
      tblcontent_row += '</td>';
      
      
      tblcontent_row += '<td>';
      tblcontent_row += '<span><b>{0}</b></span>'.format(data[i].turnover);
      tblcontent_row += '</td>';
      
      tblcontent_row += '<td>';
      tblcontent_row += '<span><b>{0}</b></span>'.format(data[i].valid_turnover);
      tblcontent_row += '</td>';
      
      winlose = data[i].winlose_member;
      color_red = ((winlose<0)?"color:red":"");
      tblcontent_row += '<td style="{1}"><b>{0}</b></td>'.format(ibc_amt_format(winlose),color_red);
      
      
      tblcontent_row += '<td>';
      tblcontent_row += '<span><b>{0}</b></span>'.format(data[i].commission_member);
      tblcontent_row += '</td>';
      
      t_winlose = data[i].total_member;
      color_red = ((t_winlose<0)?"color:red":"");
      tblcontent_row += '<td style="{1}"><b>{0}</b></td>'.format(ibc_amt_format(t_winlose),color_red);
      
      
      tblcontent_row += '</tr>';
      
      $("#tbl-winlose_by_game_body").append(tblcontent_row);
      
    }
    
    if (data.length > 0)
    {
      tblcontent_row = '<tr style="background-color:#fff;height:23px;">';
      
      tblcontent_row += '<td><b>TOTAL</td>';
      tblcontent_row += '<td> <b>{0}</td>'.format(ibc_amt_format(total_turnover));
      tblcontent_row += '<td> <b>{0}</td>'.format(ibc_amt_format(total_valid));
      
      
      color_red = ((total_winlose<0)?"color:red":"");
      tblcontent_row += '<td style="{1}"><b>{0}</td>'.format(ibc_amt_format(total_winlose),color_red);
      
      tblcontent_row += '<td><b>{0}</td>'.format(ibc_amt_format(total_comm));
      
      color_red = ((total_net_winlose<0)?"color:red":"");
      tblcontent_row += '<td style="{1}"><b>{0}</td>'.format(ibc_amt_format(total_net_winlose),color_red);
      
      tblcontent_row += '</tr>';
      
      $("#tbl-winlose_by_game_body").append(tblcontent_row);
      
    }
  }
  
  function generate_column_header_by_game(game_id){
    
    $('#tbl-winlose_detail_by_game').html('');
    $("#tbl-winlose_detail_by_game").empty();
      
    header_html = '';
      
    if (game_id == 1)
    {
      header_html = '<table border="0" align="center" cellpadding="0" cellspacing="1" style="margin-bottom:150px;" class="main_table">';
      
      header_html += '<thead>';
      
      header_html += '<tr class="main_table_header">';
      header_html += '<th class="main_table_sport_header2" width="30px">No</th>';
      header_html += '<th class="main_table_sport_header2" width="120px">Info</th>';
      header_html += '<th class="main_table_sport_header2" width="400px;">Selection</th>';
      header_html += '<th width="100px;">Odds</th>';
      header_html += '<th width="100px">Stack</th>';
      header_html += '<th width="100px">Status</th>';
      header_html += '<th width="50px">Winlose</th>';
      
      header_html += '</tr>';
      header_html += '</thead>';
      
    }    
    else if (game_id == 2)
    {
      header_html = '<table border="0" align="center" cellpadding="0" cellspacing="1" style="margin-bottom:150px;" class="main_table">';
      
      header_html += '<thead>';
      
      header_html += '<tr class="main_table_header">';
      header_html += '<th rowspan="2" width="30px">No</th>';
      header_html += '<th rowspan="2" width="120px">Info</th>';
      header_html += '<th rowspan="2" width="200px;min-width:200px;">Bet</th>';
      header_html += '<th rowspan="2" width="100px;min-width:100px;">Result</th>';
      header_html += '<th rowspan="2" width="50px">Stake</th>';
      header_html += '<th rowspan="2" width="50px">Status</th>';
      header_html += '<th width="50px">Winlose</th>';
      
      header_html += '</tr>';
      header_html += '</thead>';
      
    }
    else if (game_id == 3)
    {
      header_html = '<table border="0" align="center" cellpadding="0" cellspacing="1" style="margin-bottom:150px;" class="main_table">';
      header_html += '<thead>';
      
      header_html += '<tr class="main_table_header">';
      header_html += '<th rowspan="2" width="30px">No</th>';
      header_html += '<th rowspan="2" width="120px">Info</th>';
      header_html += '<th rowspan="2" width="200px;min-width:100px;">Bet</th>';
      header_html += '<th rowspan="2" width="100px;min-width:100px;">Result</th>';
      header_html += '<th rowspan="2" width="50px">Stack <br> Real Amount</th>';
      header_html += '<th rowspan="2" width="50px">Status</th>';
      header_html += '<th width="50px">Winlose</th>';
      
      header_html += '</tr>';
      header_html += '</thead>';
      
    }
    else if (game_id == 4)
    {
      header_html = '<table border="0" align="center" cellpadding="0" cellspacing="1" style="margin-bottom:150px;" class="main_table">';
      
      header_html += '<thead>';
      
      header_html += '<tr class="main_table_header">';
      header_html += '<th width="30px">No</th>';
      header_html += '<th width="220px">Info</th>';
      header_html += '<th width="100px;min-width:100px;">Bet</th>';
      header_html += '<th width="100px;min-width:100px;">Result</th>';
      header_html += '<th width="50px">Stack</th>';
      header_html += '<th width="50px">Status</th>';
      header_html += '<th width="50px">Winlose</th>';
      
      header_html += '</tr>';
      header_html += '</thead>';
      
    }
    // joker
    else if (game_id == "5") 
    {
      header_html = '<table border="0" align="center" cellpadding="0" cellspacing="1" style="margin-bottom:50px;" class="main_table">';
  
      header_html += '<thead>';
      
      header_html += '<tr class="main_table_header">';
      header_html += '<th width="30px">No</th>';
      header_html += '<th width="80px">Info</th>';
      header_html += '<th width="80px">Settle Id</th>';
      header_html += '<th width="100px;min-width:100px;">Round Id</th>';
      header_html += '<th width="100px;min-width:100px;">Game Type</th>';
      header_html += '<th width="50px">Winlose</th>';
      
      header_html += '</tr>';
      
      
      header_html += '</thead>';
      
    }
    
    header_html += '<tbody id="tbl-winlose_detail_by_game_body">';
    header_html += '</tbody>';    
    header_html += '</table>';
    
    $("#tbl-winlose_detail_by_game").append(header_html);
    
  }
  
  function add_data_table_detail_by_game(game_id,data){
    
    var tblcontent;
    
    if (game_id == 1)
    {
      for (var i = 0 ; i < data.length; i++) {
                    
        tblcontent_row = '<tr style="background-color:#fff;">';
        tblcontent_row += '<td>{0}</td>'.format(i+1);
        
        tblcontent_row += '<td>';
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].username);
        tblcontent_row += '<span style="color:blue;font-weight:bold">{0}</span><br/>'.format(data[i].id);
        if (data[i].partner_bet_id)
            tblcontent_row += '<span>{0}</span><br/>'.format(data[i].partner_bet_id);
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].game);
        tblcontent_row += '<span>{0}</span>&nbsp;'.format(data[i].created_date);
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].created_time);
        tblcontent_row += '</td>';
        
        if (data[i].bet_type.toLowerCase() == "handicap"){
            
            tblcontent_row += '<td>';
            
            tblcontent_row_1 = '<div class="bet_diplay_height">';
            tblcontent_row_1 += '<span class="bet_selection">';
            
            hdp_color = 'color:#27448c;';
            var hdp = data[i].detail.bet_hdp_html.toString();
            var red = hdp.indexOf('-');
            
            if (red >= 0)
              hdp_color = 'color:#900;';
             
            if (data[i].detail.bet_team == "Over")
                hdp_color = 'color:#900;';
              
            tblcontent_row_1 += '<span style="font-weight:bold;{1}">{0} </span>'.format(data[i].detail.bet_team,hdp_color);
            
            tblcontent_row_1 += '<span style="font-weight:bold;{1}">{0}</span>'.format(data[i].detail.bet_hdp_html,hdp_color);
            
            tblcontent_row_1 += '</span>';
            tblcontent_row_1 += '</div>';
            
            match_type = '';
            score = '';
            if (data[i].detail.match_type == 'live'){
              match_type = data[i].detail.match_type + "!";
              score = '{0}:{1}'.format(data[i].detail.home_score,data[i].detail.away_score);
            }
            
            tblcontent_row_2 = '<div class="bet_diplay_height">';
            tblcontent_row_2 += '<span class="bet_selection">';
            tblcontent_row_2 += '<span style="font-style:italic;">{0} </span>'.format(data[i].detail.bet_info_type_text);
            tblcontent_row_2 += ' {0} {1}'.format(match_type,score);
            tblcontent_row_2 += '</span>';
            tblcontent_row_2 += '</div>';
            
            tblcontent_row_3 = '<div class="bet_diplay_height">';
            tblcontent_row_3 += '<span class="bet_selection">';
            
            home_color = '';
            away_color = '';
            
            
            if (data[i].detail.fav == 1)
            {
              home_color = 'color:#900;font-weight:bold;';
              away_color = 'color:#27448c;font-weight:bold;';
            }
            else{
              away_color = 'color:#900;font-weight:bold;';
              home_color = 'color:#27448c;font-weight:bold;';
            }
            
            tblcontent_row_3 += '<span style="{1}">{0}</span>'.format(data[i].detail.HomeTeamName,home_color);
            tblcontent_row_3 += ' -vs- ';
            tblcontent_row_3 += '<span style="{1}">{0}</span>'.format(data[i].detail.AwayTeamName,away_color);
            
            tblcontent_row_3 += '</span>';
            tblcontent_row_3 += '</div>';
            
            tblcontent_row_4 = '<div class="bet_diplay_height">';
            tblcontent_row_4 += '<span class="bet_selection">{0}'.format(data[i].detail.LeagueName);
            tblcontent_row_4 += ' @ {0}</span>'.format(data[i].report_date);
            tblcontent_row_4 += '</div>';
            
            
            tblcontent_row_6 = '<div class="bet_diplay_height">';
            tblcontent_row_6 += '<span class="bet_selection">';
            tblcontent_row_6 += '<span style="color:red">{0}</span>'.format(data[i].sport_type);
            tblcontent_row_6 += '</span>';
            tblcontent_row_6 += '</div>';
            
            
            tblcontent_row +=  tblcontent_row_1;
            tblcontent_row +=  tblcontent_row_2;
            tblcontent_row +=  tblcontent_row_3;
            tblcontent_row +=  tblcontent_row_4;
            // tblcontent_row +=  tblcontent_row_5;
            tblcontent_row +=  tblcontent_row_6;
            
            tblcontent_row += '</td>';
            
        }
        else {
            tblcontent_row += '<td>';
            
            tblcontent_row += '<div class="bet_diplay_height">';
            tblcontent_row += '<span class="bet_selection">'
            tblcontent_row += '<a href="javascript:void(0)"';
            tblcontent_row += 'onclick="show_betdetail({0},this)" style="color:#900;decoration:underline;">{1}'.format(data[i].id,data[i].option);
            tblcontent_row += '</a>';
            tblcontent_row += '</span>';
            tblcontent_row += '</div>';
            
            tblcontent_row += '<div class="bet_diplay_height">';
            tblcontent_row += '<span class="bet_selection">';
            tblcontent_row += '<span style="font-style:italic;">{0}</span>'.format(data[i].bet_type);
            tblcontent_row += '</span>';
            tblcontent_row += '</div>';
            
            tblcontent_row += '<div class="bet_diplay_height"></div>';
            
            tblcontent_row += '<div class="bet_diplay_height">';
            tblcontent_row += '<span class="bet_selection">';
            tblcontent_row += '<span style="">{0}</span>'.format(data[i].report_date);
            tblcontent_row += '</span>';
            tblcontent_row += '</div>';
            
            tblcontent_row += '<div class="bet_diplay_height">';
            tblcontent_row += '<span class="bet_selection">';
            tblcontent_row += '<span style="color:red">{0}</span>'.format(data[i].sport_type);
            tblcontent_row += '</span>';
            tblcontent_row += '</div>';
            
            
            tblcontent_row += '</td>';
          
        }
        
        tblcontent_row += '<td>';
        tblcontent_row += '<span style="display:block">{0}</span>'.format(data[i].total_odds);
        tblcontent_row += '<span>{0}</span>'.format(data[i].oddsCategory_text);
        tblcontent_row += '</td>';
        
        tblcontent_row += '<td>';
        tblcontent_row += '<span>{0}</span>'.format(ibc_amt_format(data[i].amount));
        tblcontent_row += '</td>';
        
        
        winlose_detail= '';
        
        detail = data[i].detail
        
        if (data[i].bet_type.toLowerCase() == "handicap"){
          
          if (data[i].status.toLowerCase() != "accepted")
            {
            winlose_detail += '<span><font class="redFont">{0}</font></span>'.format(data[i].status);    
            }
          else{
            winlose_detail += '<span><font class="{1}">{0}</font></span>'.format(detail.winlose_score_text,get_font_color(data[i].wamt));      
          }
            
          winlose_detail += '<span style="display:block">FT:{0}:{1}</span>'.format(detail.fthomescore,detail.ftawayscore);
          winlose_detail += '<span style="display:block">FH:{0}:{1}</span>'.format(detail.fhhomescore,detail.fhawayscore);  
        }
        else{
            
            if (data[i].status.toLowerCase() == "accepted")
            {
                if (data[i].wamt < 0){
                    winlose_detail += '<span class="redFont">Lose</span>';
                }
                else{
                    winlose_detail += '<span>Win</span>';
                }
            }else{
                winlose_detail += '<span>{0}</span>'.format(data[i].status);
            }
        }
        
        tblcontent_row += '<td>';
        tblcontent_row += '<span>{0}</span>'.format(winlose_detail);
        tblcontent_row += '</td>';
        
        color_red = ((data[i].wamt<0)?"color:red":"");
        
        tblcontent_row += '<td style="text-align:right;padding-right:5px;">';
        tblcontent_row += '<font class="{1}">{0}</font>'.format(ibc_amt_format(data[i].wamt),get_font_color(data[i].wamt));
        // tblcontent_row += '<font class="{1}">{0}</font>'.format(ibc_amt_format(data[i].commission_member),get_font_color(data[i].commission_member));
        tblcontent_row += '</td>';
        
        tblcontent+=tblcontent_row;
          
      }
      
    }    
    else if (game_id == 2)
    {
      for (var i = 0 ; i < data.length; i++) {
                    
        tblcontent_row = '<tr style="background-color:#fff;">';
        tblcontent_row += '<td>{0}</td>'.format(i+1);
        
        tblcontent_row += '<td>';
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].username);
        tblcontent_row += '<span style="color:blue;font-weight:bold">{0}</span><br/>'.format(data[i].id);
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].game);
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].created_date);
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].created_time);
        tblcontent_row += '</td>';
        
            
        tblcontent_row += '<td>';
        
        tblcontent_row_1 = '<div class="bet_diplay_height">';
        tblcontent_row_1 += '<span class="bet_selection">';
      
        tblcontent_row_1 += '<span style="font-weight:bold;">{0} </span><br>'.format(data[i].bet_team);
        
        tblcontent_row_1 += '<span>Ref: {0} </span>'.format(data[i].txId);
        
        
        tblcontent_row_1 += '</span>';
        tblcontent_row_1 += '</div>';
        
        
        tblcontent_row_6 = '<div class="bet_diplay_height">';
        tblcontent_row_6 += '<span class="bet_selection">';
        tblcontent_row_6 += '<span style="color:red">{0}</span>'.format(data[i].sport_type);
        tblcontent_row_6 += '</span>';
        tblcontent_row_6 += '</div>';
        
        
        tblcontent_row +=  tblcontent_row_1;
        tblcontent_row +=  tblcontent_row_6;
        
        tblcontent_row += '</td>';
        
        
        tblcontent_row += '<td>';
        tblcontent_row += '<span style="display:block">{0}</span>'.format(data[i].result);
        tblcontent_row += '</td>';
        
        tblcontent_row += '<td>';
        tblcontent_row += '<span>{0}</span>'.format(ibc_amt_format(data[i].amount));
        tblcontent_row += '</td>';
        
        tblcontent_row += '<td>';
        tblcontent_row += '<span>{0}</span>'.format(data[i].status);
        tblcontent_row += '</td>';
        
        color_red = ((data[i].wamt<0)?"color:red":"");
        
        tblcontent_row += '<td style="text-align:right;padding-right:5px;">';
        tblcontent_row += '<font class="{1}">{0}</font><br>'.format(ibc_amt_format(data[i].wamt),get_font_color(data[i].wamt));
        // tblcontent_row += '<font class="{1}">{0}</font>'.format(ibc_amt_format(data[i].commission_member),get_font_color(data[i].commission_member));
        tblcontent_row += '</td>';
        
        tblcontent+=tblcontent_row;
        
      }
      
    }
    else if (game_id == 3)
    {
      for (var i = 0 ; i < data.length; i++) {
                    
        tblcontent_row = '<tr style="background-color:#fff;">';
        tblcontent_row += '<td>{0}</td>'.format(i+1);
        
        tblcontent_row += '<td>';
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].username);
        tblcontent_row += '<span style="color:blue;font-weight:bold">{0}</span><br/>'.format(data[i].id);
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].game);
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].created_date);
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].created_time);
        tblcontent_row += '</td>';
        
            
        tblcontent_row += '<td>';
        
        tblcontent_row_1 = '<div class="bet_diplay_height">';
        tblcontent_row_1 += '<span class="bet_selection">';
      
        tblcontent_row_1 += '<span style="font-weight:bold;">{0} @ <font class="{1}">{2}</font></span><br>'.format(data[i].choice,get_font_color(data[i].odds),data[i].odds);
        
        
        tblcontent_row_1 += '<span>Ref: {0} </span>'.format(data[i].txId);
        
        
        tblcontent_row_1 += '</span>';
        tblcontent_row_1 += '</div>';
        
        
        tblcontent_row_6 = '<div class="bet_diplay_height">';
        tblcontent_row_6 += '<span class="bet_selection">';
        tblcontent_row_6 += '<span style="color:red">Match# {0}/{1}</span>'.format(data[i].matchno,data[i].arena);
        tblcontent_row_6 += '</span>';
        tblcontent_row_6 += '</div>';
        
        
        tblcontent_row +=  tblcontent_row_1;
        
        tblcontent_row +=  tblcontent_row_6;
        
        tblcontent_row += '</td>';
        
        
        tblcontent_row += '<td>';
        tblcontent_row += '<span style="display:block">{0}</span>'.format(data[i].matchResult);
        tblcontent_row += '</td>';
        
        tblcontent_row += '<td>';
        tblcontent_row += '<span>{0}<br>{1}</span>'.format(ibc_amt_format(data[i].org_amount),ibc_amt_format(data[i].amount));
        tblcontent_row += '</td>';
        
        read_status =""
        if (data[i].status.toLowerCase() == "lose")
            read_status = '<span style="color:red;">{0}</span>'.format(data[i].status)
        else
            read_status = '{0}'.format(data[i].status)
            
        tblcontent_row += '<td>';
        tblcontent_row += '<span>{0} <br> {1}</span>'.format(read_status,data[i].action);
        tblcontent_row += '</td>';
        
        color_red = ((data[i].wamt<0)?"color:red":"");
        
        tblcontent_row += '<td style="text-align:right;padding-right:5px;">';
        tblcontent_row += '<font class="{1}">{0}</font><br>'.format(ibc_amt_format(data[i].wamt),get_font_color(data[i].wamt));
        // tblcontent_row += '<font class="{1}">{0}</font>'.format(ibc_amt_format(data[i].commission_member),get_font_color(data[i].commission_member));
        tblcontent_row += '</td>';
        
        tblcontent+=tblcontent_row;
        
      }
      
    }
    else if (game_id == 4)
    {
      for (var i = 0 ; i < data.length; i++) {
        tblcontent_row = '<tr style="background-color:#fff;">';
        tblcontent_row += '<td>{0}</td>'.format(i+1);
        
        tblcontent_row += '<td>';
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].login_name);
        tblcontent_row += '<span style="color:blue;font-weight:bold">{0}</span><br/>'.format(data[i].id);
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].game_name);
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].created_date);
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].created_time);
        tblcontent_row += '</td>';
        
        
        tblcontent_row += '<td>';
        
        if (data[i].bet_type == 'jackpot')
          {
            tblcontent_row_1 = '<div class="">';
            tblcontent_row_1 += '<span class="">';
            tblcontent_row_1 += '<a href="javascript:void(0)"';
            tblcontent_row_1 += 'onclick="show_betdetail_jackpot({0},this)" style="color:blue;text-decoration:underline;">{1}'.format(data[i].id,data[i].bet_value);
            tblcontent_row_1 += '</a>';
            tblcontent_row_1 += '</span>';
            tblcontent_row_1 += '</div>';
          }
        else{
        
        tblcontent_row_1 = '<div class="">';
        tblcontent_row_1 += '<span class="">';
        
        tblcontent_row_1 += '<span style="font-weight:bold;">{0} @ <font class="{1}">{2}</font></span><br>'.format(data[i].bet_value,get_font_color(data[i].odds),data[i].odds);
        
        tblcontent_row_1 += '</span>';
        tblcontent_row_1 += '</div>';
        
        } 
        
        
        tblcontent_row_6 = '<div class="">';
        tblcontent_row_6 += '<span class="">';
        tblcontent_row_6 += '<span style="color:red">Round# {0}</span>'.format(data[i].roundId);
        tblcontent_row_6 += '</span>';
        tblcontent_row_6 += '</div>';
        
        
        tblcontent_row +=  tblcontent_row_1;
        
        tblcontent_row +=  tblcontent_row_6;
        
        tblcontent_row += '</td>';
        
        
        tblcontent_row += '<td>';
        tblcontent_row += '<span style="display:block">{0}</span>'.format(data[i].result);
        tblcontent_row += '</td>';
        
        tblcontent_row += '<td>';
        tblcontent_row += '<span>{0}</span>'.format(ibc_amt_format(ibc_amt_format(data[i].amount)));
        tblcontent_row += '</td>';
        
        read_status =""
        if (data[i].winlose_status.toLowerCase() == "lose")
            read_status = '<span style="color:red;">{0}</span>'.format(data[i].winlose_status)
        else
            read_status = '{0}'.format(data[i].winlose_status)
            
        tblcontent_row += '<td>';
        tblcontent_row += '<span>{0}</span>'.format(read_status);
        tblcontent_row += '</td>';
        
        // color_red = ((data[i].winLoss<0)?"color:red":"");
              
        tblcontent_row += '<td style="text-align:right;padding-right:5px;">';
        tblcontent_row += '<font class="{1}">{0}</font><br>'.format(ibc_amt_format(data[i].winLoss),get_font_color(data[i].winLoss));
        // tblcontent_row += '<font class="{1}">{0}</font>'.format(ibc_amt_format(data[i].commission_member),get_font_color(data[i].commission_member));
        tblcontent_row += '</td>';
        
        
        tblcontent+=tblcontent_row;
      }
    }
    // joker
    else if (game_id == "5") 
    {
      for (var i = 0 ; i < data.length; i++) {
                
        tblcontent_row = '<tr style="background-color:#fff;">';
        tblcontent_row += '<td>{0}</td>'.format(i+1);
        
        tblcontent_row += '<td>';
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].login_name);
        tblcontent_row += '<span style="color:blue;font-weight:bold">{0}</span><br/>'.format(data[i].id);
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].game_name);
        tblcontent_row += '<span>{0}</span><br/>'.format(data[i].created_date);
        // tblcontent_row += '<span>{0}</span><br/>'.format(data[i].created_time);
        tblcontent_row += '</td>';
        
            
        tblcontent_row_1 = '<td>';
        tblcontent_row_1 += '<div class="bet_diplay_height">';
        tblcontent_row_1 += '<span class="bet_selection">';
        
        
        if (data[i].td_type == "bet")
        {
            tblcontent_row_1 += '<span class="">';
            tblcontent_row_1 += '<a href="javascript:void(0)"';
            tblcontent_row_1 += 'onclick="show_betdetail_joker(\'' + data[i].settle_id + '\',this)" style="color:blue;text-decoration:underline;">{0}'.format(data[i].settle_id);
            tblcontent_row_1 += '</a>';
            tblcontent_row_1 += '</span>';
        }
        else{
            
            tblcontent_row_1 += '<span class="">';
            tblcontent_row_1 += '{0}'.format(data[i].settle_id);
            tblcontent_row_1 += '</span>';
            
        }
        
        tblcontent_row_1 += '</span>';
        tblcontent_row_1 += '</div>';
  
        tblcontent_row +=  tblcontent_row_1;
  
        tblcontent_row += '</td>';
        
        tblcontent_row += '<td>{0}</td>'.format(data[i].roundid);
        
        tblcontent_row += '<td>{0}</td>'.format(data[i].game_type);
        
        read_status =""
        if (data[i].winLoss < 0 )
            read_status = '<span style="color:red;">{0}</span>'.format(ibc_amt_format(data[i].winLoss));
        else
            read_status = '{0}'.format(ibc_amt_format(data[i].winLoss))
            
        tblcontent_row += '<td>';
        tblcontent_row += '<span>{0}</span>'.format(read_status);
        tblcontent_row += '</td>';
        
        
        tblcontent_row += '</tr>';
        
        tblcontent+=tblcontent_row;
          
      };
    }
    
    $("#tbl-winlose_detail_by_game_body").append(tblcontent);
      
  }
  
  $('#btnReturn').click(function(){
    
    game_id = $("#txtGameid").val();
    txtDate = $("#txtDate").val();
    
    if (game_id == "")
    {
      list_data();   
    }
    else{
      
      $('#tbl-winlose_detail_by_game').empty();
      $('#tbl-winlose_by_game').css('display','block');
      statement_by_game(txtDate);
    }
    
  });
  
  
  function close_betdetail_jackpot(){
      $("#betdetail_jackpot").hide();
  }
  
  function show_betdetail_jackpot(bet_id,self){
      
      var offset = $(self).offset();
      var position = $(self).position();
      
      var scroll_top = $('.main_content_betlist').scrollTop();
      
      var top = position.top + scroll_top;
      
      // console.log(position.top,scroll_top);
      
      $("#betdetail_jackpot").css("top",(top + 50));
      $("#betdetail_jackpot").css("left",253);
      
      
      $('#divLoadingDetail_jackpot').css("display","block");
      $("#tdetail_jackpot").html('');
      
      $("#parlay_title").text('JackPot {0}'.format($(self).text()))
      
      $("#betdetail_jackpot").show();
          
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": api + "keno/betdetail/?bet_id="+ bet_id,
        "method": "GET",
        "headers": {
          "Authorization": "sid " + $.cookie("sid"),
          "Content-Type": "application/json",
        },
          "processData": false
      }
      
      // console.log(settings);
      
      $.ajax(settings).done(function (response) {
          
          data = new Array();
          data = response['details']
          bet = response['bet']
          
          // console.log(data);
          
          option_html = '';
          
          for (var i = 0 ; i < data.length; i++) {
            
            tblcontent_row = '<tr class="main_table_odd">';
            tblcontent_row += '<td style="font-size:13px;width:50px">{0}</td>'.format(i+1);
            
            tblcontent_row += '<td style="font-size:13px;width:150px;">';
            tblcontent_row += '{0}'.format(data[i].bet_value);
            tblcontent_row += '</td>';
            
            tblcontent_row += '<td style="font-size:13px;width:50px;">';
            tblcontent_row += '{0}'.format(data[i].odds);
            tblcontent_row += '</td>';
            
            if (bet.cal_status == 'calculated')
            {
              color = 'color:red';
              if (data[i].status.toLowerCase()=='win')
                color='color:blue';
              tblcontent_row += '<td style="font-size:13px;width:50px;{1}">{0}</td>'.format(data[i].status,color);
            }
            else
              tblcontent_row += '<td style="font-size:13px;width:50px">{0}</td>'.format(data[i].status);
            
            tblcontent_row += '</tr>';
            
            option_html+=tblcontent_row;
            
          }
          
          $("#tdetail_jackpot").html(option_html);
          
          $('#divLoadingDetail_jackpot').css("display","none");
          
        
      })
      .fail(function(){
          
          console.log(response);
      });    
      
  }
  
  
  function close_betdetail_joker(){
      $("#betdetail_joker").hide();
  }
  
  function show_betdetail_joker(bet_id,self){
      
      var offset = $(self).offset();
      var position = $(self).position();
      
      var scroll_top = $('.main_content_betlist').scrollTop();
      
      var top = position.top + scroll_top;
      
      // console.log(position.top,scroll_top);
      
      $("#betdetail_joker").css("top",(top + 35));
      $("#betdetail_joker").css("left",156);
      
      
      $('#divLoadingDetail_joker').css("display","block");
      $("#tdetail_joker").html('');
      
      $("#parlay_title").text('JackPot {0}'.format($(self).text()))
      
      $("#betdetail_joker").show();
          
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": api+ "joker/bet_detail/?settle_id="+ bet_id,
        "method": "GET",
        "headers": {
          "Authorization": "sid " + $.cookie("sid"),
          "Content-Type": "application/json",
        },
          "processData": false
      }
      
      // console.log(settings);
      
      $.ajax(settings).done(function (response) {
          
          data = new Array();
          data = response['results']
          
          // console.log(data);
          
          option_html = '';
          
          for (var i = 0 ; i < data.length; i++) {
            
            tblcontent_row = '<tr class="main_table_odd">';
            tblcontent_row += '<td style="font-size:13px;width:40px">{0}</td>'.format(i+1);
            
            tblcontent_row += '<td style="font-size:13px;width:230px;">';
            tblcontent_row += '{0}'.format(data[i].bet_id);
            tblcontent_row += '</td>';
            
            tblcontent_row += '<td style="font-size:13px;width:70px;">';
            tblcontent_row += '{0}'.format(ibc_amt_format(data[i].amount));
            tblcontent_row += '</td>';
            
            tblcontent_row += '<td style="font-size:13px;width:60px;">';
            tblcontent_row += '{0}'.format(data[i].status);
            tblcontent_row += '</td>';
            
            tblcontent_row += '</tr>';
            
            option_html+=tblcontent_row;
            
          }
          
          $("#tdetail_joker").html(option_html);
          
          $('#divLoadingDetail_joker').css("display","none");
          
        
      })
      .fail(function(){
          
          console.log(response);
      });    
      
  }