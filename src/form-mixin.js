var form_fields= [];
function setFormFieldData(field,rules,formName){
	let validation_rules = {};	
	if(typeof rules === 'string'){
		rules.split('|').map(node=>{
			let ru = node.split(':');
			validation_rules[ru[0]]= ru[1] ? ru[1] : true; 
		});
	}else if(typeof rules === 'object'){
		validation_rules = Object.assign({},rules);
	}else{
		return false;
	}
	form_fields.push({
		'field_name':field,
		'rules':validation_rules,
		'form_name':formName ? formName : '',
	});
	return true;
}
import runValidation from './validationRules.js';
const FormMixin = {
	directives: {
		validate:{
			inserted: function (el,binding) {
				let form = el.closest('form');
				setFormFieldData(el.name,binding.value,form.getAttribute('validationScope'));
			}
		}
	},
	data(){
		return{
			form_errors:[],
		};
	},
	methods:{
		validateForm(){
			//run validation and add error to this.form_errors
			return new Promise((resolve, reject) => {
				this.form_errors = [];
				form_fields.forEach((form_field)=>{ 
					for (const [key, value] of Object.entries(form_field.rules)) {
						let field_value = document.getElementsByName(form_field.field_name)[0].value;
						console.log(field_value,runValidation[key](field_value));
						if(!runValidation[key](field_value)){
							this.form_errors.push({
								'field_name':form_field.field_name,
								'rule_name':key,
								'form_name':form_field.form_name,
							});
						};
					}
					if(this.form_errors.length){
						resolve(false);
					}
					resolve(true);
				});
			});
		},
		collectErrors:function(field){ /* eslint-disable-line no-unused-vars */
			if(this.form_errors){
				return this.form_errors.flatMap(node=>node);
			}
		},
		formErrors:function(field){

			if (!this.form_errors || !this.form_errors.length) {
				return null;
			}
			//get current field errors from this.form_errors 
			let field_error = this.form_errors.find(node=>{
				if(node.form_name) return (node.form_name+'.'+node.field_name)===field;
				return node.field_name===field;
			});

			if(!field_error){
				return '';
			}
			let field_name = field_error.field_name;
			//remove string between brackets and remove underscore
			field_name=field_name.replace(/_/g, ' ').replace(/ *\([^)]*\) */g, ' ');
			return  this.$t('validation.'+field_error.rule_name,{'attribute': field_name});
		},
		convertTime12(time24){
			var ts = time24;
			var H = +ts.substr(0, 2);
			var h = (H % 12) || 12;
			h = (h < 10)?('0'+h):h;  // leading 0 at the left for 1 digit hours
			var ampm = H < 12 ? ' am' : ' pm';
			ts = h + ts.substr(2, 3) + ampm;
			return ts;
		},
		onlyNumber ($event) {
			let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
			if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) { // 46 is dot
				$event.preventDefault();
			}
		},
		processParticipantEntriesForGraph(journal_entries, commitmentDuration){
			if (journal_entries.length === 0 ) {
				return [];
			}
			let startDate = '';
			let journalArray = [];
			let journal_entries_rating=[];
			journalArray = journal_entries.map(each => ({[each.action_date]: each.rating}));
			startDate = this.$moment(journal_entries[0].action_date).format('YYYY-MM-DD');
			let journalKey = 0;
			for(let kk=0; kk <= commitmentDuration; kk++) {
				const searchDate = journalArray.some((each) => each.hasOwnProperty(startDate));
				if (searchDate) {
					journal_entries_rating.push(journalArray[journalKey][startDate]);
					startDate = this.$moment(startDate).add('1', 'd').format('YYYY-MM-DD');
					journalKey = journalKey + 1;
				} else {
					journal_entries_rating.push(null);
					startDate = this.$moment(startDate).add('1', 'd').format('YYYY-MM-DD');
				}
			}
			return journal_entries_rating;
		},
		processBuddyEntriesForGraph(journal_entries, commitment, commitmentDuration) {
			if (journal_entries.length === 0 ) {
				return [];
			}
			let journalArray = [];
			let journal_entries_rating=[];
			const commitmentDate = this.dateInLocale(commitment.created_at).format('YYYY-MM-DD');
			journalArray = journal_entries.sort((a, b) => {
				return a.commitmentDay - b.commitmentDay;
			}).map(each => ({[this.daysDiff(each.action_date, commitmentDate)]: each.rating}));
			let journalKey = 0;
			for(let kk=0; kk <= commitmentDuration; kk++) {
				const searchDate = journalArray[journalKey] ? Object.keys(journalArray[journalKey])[0] : 0;
				if (kk ===  parseInt(searchDate, 10)) {
					journal_entries_rating.push(Object.values(journalArray[journalKey])[0]);
					journalKey++;
				} else {
					journal_entries_rating.push(null);
				}
			}
			return journal_entries_rating;
		},
	}
};
export default  FormMixin;
